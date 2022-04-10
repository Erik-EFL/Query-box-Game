import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { questionDataThunk } from '../redux/actions/actionQuestions';
import { questionDone, questionPoints } from '../redux/actions/actions';
import Timer from '../components/Timer';
import styles from '../Css/Questions.module.css';
import Header from '../components/Header';
// import fetchToken from '../Services/fetchToken';
// import fetchDataQuestions from '../Services/fetchQuestions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      indexDQ: 0,
      feedbackRedirect: false,
      timer: 30,
    };
  }

   componentDidMount = async () => {
     const { receiveQuestions } = this.props;
     receiveQuestions();
   }

   handleClick = () => {
     const { questionResponded } = this.props;
     questionResponded(false);
     const { indexDQ } = this.state;
     const valorNovo = indexDQ + 1;
     this.setState({ indexDQ: valorNovo, timer: 30 });
     const questionsLimit = 3;
     if (indexDQ === questionsLimit) {
       this.setState({ feedbackRedirect: true });
     }
   }

  handleClickAnswer = ({ target }) => {
    const { indexDQ, timer } = this.state;
    const { questionResponded, questions } = this.props;
    questionResponded(true);
    const { difficulty } = questions[indexDQ];
    if (target.id === 'correct-answer') {
      this.scoreCalc(timer, difficulty);
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

  questionAnswerPrinter = (question) => {
    const { questionOk } = this.props;
    let botoes = question.incorrect_answers.map((element, index) => (
      <button
        key={ element }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        onClick={ this.handleClickAnswer }
        className={ questionOk ? styles.incorrect_answer : styles.question }
        disabled={ questionOk }
      >
        {element}

      </button>
    ));
    botoes.push(
      <button
        key="correct"
        data-testid="correct-answer"
        id="correct-answer"
        type="button"
        onClick={ this.handleClickAnswer }
        className={ questionOk ? styles.correct_answer : styles.question }
        disabled={ questionOk }
      >
        {question.correct_answer}

      </button>,
    );
    botoes = this.shuffle(botoes);
    return botoes;
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
    const { indexDQ, feedbackRedirect } = this.state;
    const { questions, questionOk } = this.props;
    localStorage.setItem('score', 'score');
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
                    <p
                      data-testid="answer-options"
                    >
                      {this.questionAnswerPrinter(questions[indexDQ])}
                    </p>
                  </div>
                </div>
              )
            }
          </div>
          {feedbackRedirect ? (
            <Link to="/feedback">
              <button
                className={ questionOk ? styles.buttonVis : styles.buttonInvis }
                type="submit"
                onClick={ this.handleClick }
                data-testid="btn-next"
              >
                Próxima pergunta

              </button>
            </Link>)
            : (
              <button
                className={ questionOk ? styles.buttonVis : styles.buttonInvis }
                type="submit"
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
});

const mapDispatchToProps = (dispatch) => ({
  receiveQuestions: () => dispatch(questionDataThunk()),
  questionResponded: (bool) => dispatch(questionDone(bool)),
  dispatchScore: (score, assertions) => dispatch(questionPoints(score, assertions)),
});

Questions.propTypes = {
  receiveNewToken: PropTypes.func,
  questions: PropTypes.array,
  player: PropTypes.object,
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
