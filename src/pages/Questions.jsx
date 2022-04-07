import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Questions.css';
import { questionDataThunk } from '../redux/actions/actionQuestions';
// import fetchToken from '../Services/fetchToken';
// import fetchDataQuestions from '../Services/fetchQuestions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      /* results: [], */
      // indexDQ: 0,
    };
  }

   componentDidMount = async () => {
     const { receiveQuestions } = this.props;
     /*      const result = await this.receiveQuestions();
     const requestFailed = 3;
     if (result.response_code === requestFailed) {
       await receiveNewToken(token); */
     receiveQuestions();
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

  render() {
    /* const { indexDQ } = this.state; */
    const { questions } = this.props;

    console.log(questions);

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
        <h1>Questions</h1>
        {/*         {questions && (
          <div className="questions-container">
            <p data-testid="question-category">{questions[indexDQ].category}</p>
            <p data-testid="question-text">{questions[indexDQ].question}</p>
          </div>,
          sortedQuestions.map((answer) => (
            <button
              key={ answer.id }
              data-testid={ answer.id }
              type="submit"
            >
              {answer.item}
            </button>
          ))
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.questions,
  questions: state.questions.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  receiveQuestions: () => dispatch(questionDataThunk()),
});

Questions.propTypes = {
  receiveNewToken: PropTypes.func,
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
