import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    };
  }

   componentDidMount = async () => {
     const { receiveQuestions } = this.props;
     receiveQuestions();
   }

   handleClick = () => {
     const { questionResponded } = this.props;
     const { indexDQ } = this.state;
     const valorNovo = indexDQ + 1;
     this.setState({ indexDQ: valorNovo });
     questionResponded(false);
   }

   /*   receiveQuestions = async () => {
    const { token } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ results: data.results });
    return data;
  } */

  randomAlternatives = () => Math.floor(Math.random() * Number('1000')) ;

  /*     organizerQuestions = () => {
      const { results, indexDQ } = this.state;
      const {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = results[indexDQ];
      this.setState((prevState) => [...prevState, sortedQuestions])
        .sort(() => Math.random() - Number('0.5'));
    } */

  /*   corretaAleatoria = (question) => {
    const number = 3;

    const incorretas = question.incorrect_answers;
    const correta = question.correct_answer;
    const aleatorio = Math.floor(Math.random() * number - 0);
    const devolver = incorretas[aleatorio];
    incorretas[aleatorio] = correta;
    incorretas.push(devolver);
    return {
      incorretas,

    };
  } */

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

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  render() {
    const { indexDQ } = this.state;
    const { questions } = this.props;
    const { player: { nome, image } } = this.props;

    /*     const incorrect = questions.map((item, index) => ({
      item,
      position: this.randomAlternatives(),
      id: `wrong-answer-${index}`,
    }));
    console.log(incorrect); */

    /*    const sortedQuestions = [...incorrect, {
      item: questions.correct_answer,
      position: this.randomAlternatives(),
      id: 'correct-answer',
    }]; */

    return (
      <div className="Questions">
        <header className="user-header">
          <img
            src={ image }
            data-testid="header-profile-picture"
            alt="profile-avatar"
          />
          <div>
            Jogador:
            <h2 data-testid="header-player-name">{nome}</h2>
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
        <button type="submit" onClick={ this.handleClick }>Proxima pergunta</button>
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
