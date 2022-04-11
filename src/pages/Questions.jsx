import md5 from 'crypto-js/md5';
import he from 'he';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import styles from '../Css/Questions.module.css';
import { questionDone, questionPoints, timerAction } from '../redux/actions/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      indexDQ: 0,
      feedbackRedirect: false,
      btnDisabled: false,
    };
  }

   componentDidMount = async () => {
     const { questions } = this.props;
     const { indexDQ } = this.state;
     /*      const questionReplace = questions.map((item) => {

     }); */
     this.organizeQuestions(questions[indexDQ]);
     this.startInterval();
   }

   organizeQuestions = (question) => {
     const wrong = question.incorrect_answers;
     const incorrects = wrong.map((incorrect) => ({ incorrect }));
     const correct = [{ correct: question.correct_answer }];
     const list = [...incorrects, ...correct];
     const newList = list.sort(() => Math.random() - Number('0.5'));
     this.setState({ organizedQuestions: newList });
   }

   startInterval = () => {
     const oneSecond = 1000;
     const interval = setInterval(this.startWatch, oneSecond);
     this.setState({ interval });
   }

  startWatch = () => {
    const { interval } = this.state;
    const { questionResponded, timerQuestion, dispatchTime, questionOk } = this.props;
    if (timerQuestion > 0 && questionOk === false) {
      const newTime = timerQuestion - 1;
      dispatchTime(newTime);
    } else {
      this.setState({ btnDisabled: true });
      questionResponded(true);
      clearInterval(interval);
    }
  }

   handleClick = () => {
     const { questionResponded, dispatchTime, questions } = this.props;
     const time = 30;
     dispatchTime(time);
     this.startInterval();
     questionResponded(false);
     const { indexDQ } = this.state;
     const valorNovo = indexDQ + 1;
     this.organizeQuestions(questions[valorNovo]);
     this.setState({ indexDQ: valorNovo, btnDisabled: false });
     const questionsLimit = 3;
     if (indexDQ === questionsLimit) {
       this.setState({ feedbackRedirect: true });
     }
   }

   redirectFeedback = () => {
     const { interval } = this.state;
     const { history } = this.props;
     clearInterval(interval);
     history.push('/feedback');
   }

  handleClickAnswer = ({ target }) => {
    this.setState({ btnDisabled: true });
    const { indexDQ } = this.state;
    const { questionResponded, questions, timerQuestion } = this.props;
    questionResponded(true);
    const { difficulty } = questions[indexDQ];
    if (target.id === 'correct') {
      this.scoreCalc(timerQuestion, difficulty);
    }
  }

  scoreCalc = (timer, difficulty) => {
    const { player: { score, assertions }, dispatchScore } = this.props;
    const newAssertions = assertions + 1;
    let difficultyValue = null;
    const hard = 3;
    const ten = 10;
    if (difficulty === 'easy') { difficultyValue = 1; }
    if (difficulty === 'medium') { difficultyValue = 2; }
    if (difficulty === 'hard') { difficultyValue = hard; }
    const calculation = ten + (timer * difficultyValue) + score;
    dispatchScore(calculation, newAssertions);
  }

  questionPrinter = () => {
    const { questionOk } = this.props;
    const { organizedQuestions, btnDisabled } = this.state;
    let qualquer = 0;
    return organizedQuestions.map((element) => {
      if (element.incorrect) {
        qualquer += 1;
        return (
          <button
            key={ element.incorrect }
            data-testid={ `wrong-answer-${qualquer - 1}` }
            type="button"
            onClick={ this.handleClickAnswer }
            className={ questionOk ? styles.incorrect_answer : styles.question }
            disabled={ btnDisabled }
          >
            {he.decode(
              element.incorrect,
            )}
          </button>
        );
      }
      return (
        <button
          key="correct"
          data-testid="correct-answer"
          id="correct"
          type="button"
          onClick={ this.handleClickAnswer }
          className={ questionOk ? styles.correct_answer : styles.question }
          disabled={ btnDisabled }
        >
          {he.decode(element.correct)}
        </button>
      );
    });
  }

  gravatarHash = (userEmail) => {
    const convertEmail = md5(userEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertEmail}`;
    return gravatarUrl;
  }

  render() {
    const { indexDQ, feedbackRedirect, organizedQuestions } = this.state;
    const { questions, questionOk } = this.props;
    return (
      <div className={ styles.Questions }>
        <Header />
        <div className={ styles.mainQuestionContent }>
          <div className={ styles.containerQuestions }>
            <Timer />
            {
              questions && (
                <div className={ styles.containerInfo }>
                  <div className={ styles.questInfo }>
                    <h3
                      data-testid="question-category"
                      className={ styles.titleQuestion }
                    >
                      {questions[indexDQ].category.replace(/&quot;/g, '"')
                        .replace(/&#039;/g, '\'')
                        .replace(/&eacute;/g, 'é')}
                    </h3>
                    <p
                      data-testid="question-text"
                      className={ styles.contentQuestion }
                    >
                      {questions[indexDQ].question.replace(/&quot;/g, '"')
                        .replace(/&#039;/g, '\'')
                        .replace(/&eacute;/g, 'é')}
                    </p>
                  </div>
                  <div className={ styles.answers }>
                    <p>
                      {organizedQuestions && (
                        <div data-testid="answer-options">{this.questionPrinter()}</div>
                      )}
                    </p>
                  </div>
                </div>
              )
            }
          </div>
          {feedbackRedirect ? (
            <div>
              <button
                className={ questionOk ? styles.buttonVis : styles.buttonInvis }
                type="submit"
                onClick={ this.redirectFeedback }
                data-testid="btn-next"
              >
                Próxima pergunta
              </button>
            </div>)
            : (
              <button
                className={ questionOk ? styles.buttonVis : styles.buttonInvis }
                type="button"
                onClick={ this.handleClick }
                data-testid="btn-next"
              >
                Próxima pergunta
              </button>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.questions,
  player: state.player,
  questions: state.questions.questions.results,
  questionOk: state.questionDone.responded,
  timerQuestion: state.timerQuestion.timer,
});

const mapDispatchToProps = (dispatch) => ({
  questionResponded: (bool) => dispatch(questionDone(bool)),
  dispatchScore: (score, assertions) => dispatch(questionPoints(score, assertions)),
  dispatchTime: (time) => dispatch(timerAction(time)),
});

Questions.propTypes = {
  receiveNewToken: PropTypes.func,
  questions: PropTypes.array,
  player: PropTypes.object,
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
