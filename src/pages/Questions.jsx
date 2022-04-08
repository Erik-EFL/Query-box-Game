import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionDataThunk } from '../redux/actions/actionQuestions';
import { questionDone, questionPoints } from '../redux/actions/actions';
import './Questions.css';
import timerIcon from '../timer.png';
// import fetchToken from '../Services/fetchToken';
// import fetchDataQuestions from '../Services/fetchQuestions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      indexDQ: 0,
      timer: 30,
    };
  }

   componentDidMount = async () => {
     const { receiveQuestions } = this.props;
     receiveQuestions();
     this.timerInterval();
   }

   timerInterval = () => {
     const oneSecond = 1000;
     const interval = setInterval(this.startWatch, oneSecond);
     this.setState({ interval });
   }

   startWatch = () => {
     const { timer, interval } = this.state;
     const { questionResponded, questionOk } = this.props;
     if (timer > 0 && questionOk === false) {
       this.setState({ timer: timer - 1 });
     } else {
       questionResponded(true, timer);
       clearInterval(interval);
     }
   }

   handleClick = () => {
     const { questionResponded } = this.props;
     questionResponded(false);
     const { indexDQ } = this.state;
     const valorNovo = indexDQ + 1;
     this.setState({ indexDQ: valorNovo, timer: 30 });

     this.timerInterval();
   }

  randomAlternatives = () => Math.floor(Math.random() * Number('1000')) ;

  handleClickAnswer = ({ target }) => {
    const { indexDQ, timer } = this.state;
    const { questionResponded, questions } = this.props;
    questionResponded(true);
    const { difficulty } = questions[indexDQ];
    if (target.id === 'correct') {
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
    const botoes = question.incorrect_answers.map((element, index) => (
      <button
        key={ element }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        onClick={ this.handleClickAnswer }
        id="incorrect"
        className={ questionOk ? 'incorrect-answer' : '' }
        disabled={ questionOk }
      >
        {element}

      </button>
    ));
    botoes.push(
      <button
        key="correct"
        data-testid="correct-answer"
        type="button"
        onClick={ this.handleClickAnswer }
        id="correct"
        className={ questionOk ? 'correct-answer' : '' }
        disabled={ questionOk }
      >
        {question.correct_answer}

      </button>,
    );
    this.shuffle(botoes);
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
    const { indexDQ, timer } = this.state;
    const { questions, questionOk } = this.props;
    const { player: { name, gravatarEmail, score } } = this.props;

    return (
      <div className="Questions">
        <header className="user-header">
          <img
            src={ this.gravatarHash(gravatarEmail) }
            data-testid="header-profile-picture"
            alt="profile-avatar"
          />
          <div>
            Jogador:
            <h2 data-testid="header-player-name">{name}</h2>
          </div>
          <div>
            Pontuação:
            <h2 data-testid="header-score">{score}</h2>
          </div>
        </header>
        <h1>Questions</h1>
        {
          questions ? (
            <>
              <div className="timer-container">
                <span className="timer-text">{ timer }</span>
                <img className="timer-icon" src={ timerIcon } alt="timer" />
              </div>
              <p
                data-testid="question-category"
              >
                {questions[indexDQ].category}

              </p>
              <p
                data-testid="question-text"
              >
                {questions[indexDQ].question}

              </p>
              <p
                data-testid="answer-options"
              >
                {this.questionAnswerPrinter(questions[indexDQ])}

              </p>
            </>) : (console.log(questions)
          )
        }
        {questionOk ? (
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ !questionOk }
          >
            Proxima pergunta

          </button>) : ''}
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
