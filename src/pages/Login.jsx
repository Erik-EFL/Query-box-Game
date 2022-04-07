import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, tokenLogin } from '../redux/actions/actions';
import fetchToken from '../Services/fetchToken';
import '../App.css';
import logo from '../trivia.png';

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
      <div className="App">
        <main className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
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
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (email, nome) => dispatch(login(email, nome)),
  token: (tokenAPI) => dispatch(tokenLogin(tokenAPI)),
});

Login.propTypes = {
  user: PropTypes.func,
  history: PropTypes.func,
  token: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
