import React, { Component } from 'react';

class Feadback extends Component {
  render() {
    return (
      <div className="feadback-page">
        <h1> Feadback </h1>
        <p data-testid="feedback-text">Essa foi a sua pontuação!</p>
      </div>
    );
  }
}

export default Feadback;
