import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionDataThunk } from '../redux/actions/actionQuestions';
import './Questions.css';
// import fetchToken from '../Services/fetchToken';
// import fetchDataQuestions from '../Services/fetchQuestions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      indexDQ: 0,
      indexInit: 0,
      playerWrong: false,
      playerRight: false,
    };
  }

   componentDidMount = async () => {
     const { receiveQuestions } = this.props;
     receiveQuestions();
   }

   handleClick = () => {
     const { indexDQ } = this.state;
     const valorNovo = indexDQ + 1;
     this.setState({
       indexInit: valorNovo,
       indexDQ: valorNovo,
       playerRight: false,
       playerWrong: false });
     this.indexInitSumn();
   }

   indexInitSumn = () => {
     const proxIndex = indexInit + 1;
     this.setState({ indexInit: proxIndex });
   }

  randomAlternatives = () => Math.floor(Math.random() * Number('1000')) ;

  handleClickAnswer = () => {
    this.setState({
      playerRight: true,
      playerWrong: true,
    });
  }

  questionAnswerPrinter = (question) => {
    const { playerRight, playerWrong, indexDQ, indexInit } = this.state;
    const botoes = question.incorrect_answers.map((element, index) => (
      <button
        key={ element }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        onClick={ this.handleClickAnswer }
        className={ playerWrong ? 'incorrect-answer' : '' }
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
        className={ playerRight ? 'correct-answer' : '' }
      >
        {question.correct_answer}

      </button>,
    );
    if (indexInit === indexDQ) {
      this.shuffle(botoes);
    }
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
    console.log(questions);

    return (
      <div className="Questions">
        <h1>Questions</h1>
        {
          questions ? (
            <>
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
        <div>
          <header>
            <img
              src={ image }
              data-testid="header-profile-picture"
              alt="profile-avatar"
            />
            <span data-testid="header-player-name">{nome}</span>
            <span data-testid="header-score">0</span>
          </header>
          Questions
        </div>
        <button type="submit" onClick={ this.handleClick }>Proxima pergunta</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.questions,
  player: state.player,
  questions: state.questions.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  receiveQuestions: () => dispatch(questionDataThunk()),
});

Questions.propTypes = {
  receiveNewToken: PropTypes.func,
  questions: PropTypes.array,
  player: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
