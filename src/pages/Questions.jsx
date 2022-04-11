import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionDataThunk } from '../redux/actions/actionQuestions';
import { questionDone, questionPoints, timerAction } from '../redux/actions/actions';
import Timer from '../components/Timer';
import styles from '../Css/Questions.module.css';
import Header from '../components/Header';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      indexDQ: 0,
      organize: true,
      feedbackRedirect: false,
    };
  }

   componentDidMount = async () => {
     const { receiveQuestions } = this.props;
     receiveQuestions();
     this.startInterval();
   }

   organizeQuestions = (question) => {
     const { organize } = this.state;
     const wrong = question.incorrect_answers;
     const incorrects = wrong.map((incorrect) => ({ incorrect }));
     const correct = [{ correct: question.correct_answer }];
     const result = this.shuffle([...correct, ...incorrects]);
     if (organize) {
       this.setState({ organizedQuestions: result, organize: false });
     }
   }

   startInterval = () => {
     const oneSecond = 1000;
     const interval = setInterval(this.startWatch, oneSecond);
     this.setState({ interval });
   }

  startWatch = () => {
    const { interval } = this.state;
    const { questionResponded, timerQuestion, dispatchTime } = this.props;
    const { questionOk } = this.props;
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
     this.setState({ indexDQ: valorNovo, organize: true, btnDisabled: false },
       this.organizeQuestions(questions[indexDQ]));
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

  randomAlternatives = () => Math.floor(Math.random() * Number('1000')) ;

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
    return organizedQuestions.map((element, index) => {
      if (element.incorrect) {
        console.log(index);
        return (
          <button
            key={ element.incorrect }
            data-testid={ `wrong-answer-${index}` }
            type="button"
            onClick={ this.handleClickAnswer }
            className={ questionOk ? styles.incorrect_answer : styles.question }
            disabled={ btnDisabled }
          >
            {element.incorrect}
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
          {element.correct}
        </button>
      );
    });
  }

  gravatarHash = (userEmail) => {
    const convertEmail = md5(userEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertEmail}`;
    return gravatarUrl;
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
                      {questions[indexDQ].category}
                    </h3>
                    <p
                      data-testid="question-text"
                      className={ styles.contentQuestion }
                    >
                      {questions[indexDQ].question}
                    </p>
                  </div>
                  <div className={ styles.answers }>
                    <p
                      data-testid="answer-options"
                    >
                      {this.organizeQuestions(questions[indexDQ])}
                      {organizedQuestions && (
                        <div>{this.questionPrinter()}</div>
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
  receiveQuestions: () => dispatch(questionDataThunk()),
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
