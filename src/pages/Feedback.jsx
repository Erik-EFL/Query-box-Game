import React, { Component } from 'react';

class Feedback extends Component {
  render() {
    return (
      <div className="feadback-page">
        <h1> Feedback </h1>
        <p data-testid="feedback-text">Essa foi a sua pontuação!</p>
      </div>
    );
  }
}

export default Feedback;
