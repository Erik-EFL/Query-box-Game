import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import styles from '../Css/Questions.module.css';
import { questionDataThunk } from '../redux/actions/actionQuestions';
import { questionDone } from '../redux/actions/actions';
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
        type="button"
        onClick={ this.handleClickAnswer }
        className={ questionOk ? styles.correct_answer : styles.question }
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
    const { indexDQ } = this.state;
    const { questions, questionOk } = this.props;
    const { player: { name, gravatarEmail } } = this.props;

    return (
      <div className={ styles.Questions }>
        <header className={ styles.user_header }>
          <img
            className={ styles.user_image }
            src={ this.gravatarHash(gravatarEmail) }
            data-testid="header-profile-picture"
            alt="profile-avatar"
          />
          <div className={ styles.user_info }>
            Jogador:
            <h2 data-testid="header-player-name">{name}</h2>
            Pontuação:
            <h2 data-testid="header-score">0</h2>
          </div>
        </header>
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
                      {this.questionAnswerPrinter(questions[indexDQ])}
                    </p>
                  </div>
                </div>
              )
            }
          </div>
          <button
            className={ !questionOk ? styles.bottonInvis : styles.bottonVis }
            type="submit"
            onClick={ this.handleClick }
            data-testid="btn-next"
          >
            Proxima pergunta

          </button>
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
});

Questions.propTypes = {
  receiveNewToken: PropTypes.func,
  questions: PropTypes.array,
  player: PropTypes.object,
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
