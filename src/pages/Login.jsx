import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../Css/Login.module.css';
import { login, tokenLogin } from '../redux/actions/actions';
import fetchToken from '../Services/fetchToken';
import queryLogo from '../Css/assets/query.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      email: '',
      nome: '',
    };
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
    const { user, history, token } = this.props;
    const { email, nome } = this.state;
    const tokenAPI = await fetchToken();
    user(email, nome);
    token(tokenAPI);
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
        <footer>Todos os direitos reservados ao Main-Goup-18</footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (gravatarEmail, name) => dispatch(login(gravatarEmail, name)),
  token: (tokenAPI) => dispatch(tokenLogin(tokenAPI)),
});

Login.propTypes = {
  user: PropTypes.func,
  history: PropTypes.func,
  token: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
