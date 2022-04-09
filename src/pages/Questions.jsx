import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Timer from '../components/Timer';
import { questionDataThunk } from '../redux/actions/actionQuestions';
import { questionDone } from '../redux/actions/actions';
import './Questions.css';
// import fetchToken from '../Services/fetchToken';
// import fetchDataQuestions from '../Services/fetchQuestions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      indexDQ: 0,
      feadbackRedirect: false,
    };
  }

   componentDidMount = async () => {
     const { receiveQuestions } = this.props;
     receiveQuestions();
   }

   handleClick = () => {
     const { questionResponded } = this.props;
     const { indexDQ, feadbackRedirect } = this.state;
     const valorNovo = indexDQ + 1;
     this.setState({ indexDQ: valorNovo });
     const questionsLimit = 3;
     if (indexDQ === questionsLimit) {
       this.setState({ feadbackRedirect: true });
     }
     console.log(feadbackRedirect);
     questionResponded(false);
   }

  randomAlternatives = () => Math.floor(Math.random() * Number('1000')) ;

  handleClickAnswer = () => {
    const { questionResponded } = this.props;
    questionResponded(true);
  }

  questionAnswerPrinter = (question) => {
    const { questionOk } = this.props;
    const botoes = question.incorrect_answers.map((element, index) => (
      <button
        key={ element }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        onClick={ this.handleClickAnswer }
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
    const { indexDQ, feadbackRedirect } = this.state;
    const { questions, questionOk } = this.props;
    const { player: { name, gravatarEmail } } = this.props;

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
            <h2 data-testid="header-score">0</h2>
          </div>
        </header>
        <h1>Questions</h1>
        {
          questions ? (
            <>
              <Timer />
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
        {questionOk && !feadbackRedirect ? (
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ !questionOk }
          >
            Proxima pergunta

          </button>) : ''}
        {questionOk && feadbackRedirect ? (
          <Link to="/feadback">
            <button
              type="submit"
              onClick={ this.handleClick }
              disabled={ !questionOk }
              data-testid="btn-next"
            >
              Proxima pergunta

            </button>
          </Link>) : ''}
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
});

Questions.propTypes = {
  receiveNewToken: PropTypes.func,
  questions: PropTypes.array,
  player: PropTypes.object,
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
