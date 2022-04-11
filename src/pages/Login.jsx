import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../Css/Login.module.css';
import { login,
  questionDone,
  questionPoints,
  tokenLogin,
  timerAction } from '../redux/actions/actions';
import fetchToken from '../Services/fetchToken';
import queryLogo from '../Css/assets/query.png';
import { questionDataThunk } from '../redux/actions/actionQuestions';
import Footer from '../components/Footer';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      email: '',
      nome: '',
    };
  }

  componentDidMount = async () => {
    const { dispatchScore, questionResponded, dispatchTime } = this.props;
    const time = 30;
    dispatchScore(0, 0);
    questionResponded(false);
    dispatchTime(time);
  }

  validate = () => {
    const { email, nome } = this.state;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailValid = emailRegex.test(email);
    const fields = [email, nome];
    const validFields = fields.every((field) => field !== '');
    const validAllFields = emailValid && validFields;

    return validAllFields
      ? this.setState({ btnDisabled: false })
      : this.setState({ btnDisabled: true });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validate);
  };

  handleClick = async () => {
    const { user, history, token, receiveQuestions } = this.props;
    const { email, nome } = this.state;
    user(email, nome);
    const tokenAPI = await fetchToken();
    await token(tokenAPI);
    await receiveQuestions();
    history.push('/questions');
  };

  render() {
    const { btnDisabled } = this.state;
    return (
      <div className={ styles.loginMainDiv }>
        <img src={ queryLogo } alt="logo-trivia" className={ styles.logo_trivia } />
        <div className="login-container">
          <form className={ styles.formLogin }>
            <label htmlFor="nome" className={ styles.inputsLogin }>
              <input
                className={ styles.loginNameInput }
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome"
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </label>
            <label htmlFor="email" className={ styles.inputsLogin }>
              <input
                className={ styles.loginEmailInput }
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </label>
            <div className={ styles.buttonContainer }>
              <button
                className={ styles.playBtn }
                type="button"
                data-testid="btn-play"
                onClick={ this.handleClick }
                disabled={ btnDisabled }
              >
                Play
              </button>
              <Link
                className={ styles.settings }
                data-testid="btn-settings"
                to="/settings"
              >
                Game Settings
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (gravatarEmail, name) => dispatch(login(gravatarEmail, name)),
  token: (tokenAPI) => dispatch(tokenLogin(tokenAPI)),
  receiveQuestions: () => dispatch(questionDataThunk()),
  dispatchScore: (score, assertions) => dispatch(questionPoints(score, assertions)),
  questionResponded: (bool) => dispatch(questionDone(bool)),
  dispatchTime: (time) => dispatch(timerAction(time)),
});

Login.propTypes = {
  user: PropTypes.func,
  history: PropTypes.func,
  token: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
