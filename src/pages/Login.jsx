import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import { login, tokenLogin } from '../redux/actions/actions';
import fetchToken from '../Services/fetchToken';
import settingsIcon from '../settings.png';
import triviaLogo from '../trivia.png';

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
      <div>
        <div className="login-container">
          <header>
            <img src={ triviaLogo } alt="logo-trivia" className="logo-trivia" />
          </header>
          <div className="settings-button">
            <Link to="/settings">
              <img
                src={ settingsIcon }
                data-testid="btn-settings"
                alt="Ícone do botão configurações"
              />
            </Link>
          </div>
          <form>
            <label htmlFor="nome">
              Nome:
              <input
                type="text"
                name="nome"
                id="nome"
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </label>
            <label htmlFor="email">
              E-mail
              <input
                type="email"
                name="email"
                id="email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ btnDisabled }
            >
              Play
            </button>
          </form>
        </div>
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
