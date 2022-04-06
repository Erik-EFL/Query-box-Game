import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/actions';

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

  handleClick = (event) => {
    const { user, history } = this.props;
    const { email, nome } = this.state;
    user(email, nome);
    history.push('/teste');
  };

  render() {
    const { btnDisabled } = this.state;
    return (
      <div>
        <div className="login-container">
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
  user: (email, nome) => dispatch(login(email, nome)),
});

Login.propTypes = {
  user: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
