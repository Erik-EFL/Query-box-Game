import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
    };
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <div>
        <div className="login-container">
          <input
            type="text"
            name=""
            id=""
            data-testid="input-player-name"
          />
          <input
            type="email"
            name=""
            id=""
            data-testid="input-gravatar-email"
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ btnDisabled }
          >
            PLay
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
