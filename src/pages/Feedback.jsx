import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import styles from '../Css/Questions.module.css';
import feedbacksMessages from './helpers';

class Feedback extends Component {
  gravatarHash = (userEmail) => {
    const convertEmail = md5(userEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertEmail}`;
    return gravatarUrl;
  }

  render() {
    const { player: { name, gravatarEmail, score, assertions } } = this.props;
    console.log(assertions);
    return (
      <div className="feedback-page">
        <header className={ styles.user_header }>
          <img
            className={ styles.user_image }
            src={ this.gravatarHash(gravatarEmail) }
            data-testid="header-profile-picture"
            alt="profile-avatar"
          />
          <div>
            Jogador:
            <h2 data-testid="header-player-name">{name}</h2>
          </div>
          <div>
            Pontuação:
            <h2 data-testid="header-score">{score}</h2>
          </div>
        </header>
        <main>
          <h1> Feedback </h1>

          {assertions
          && assertions >= Number('3')
            ? <p data-testid="feedback-text">{ feedbacksMessages.done }</p>
            : <p data-testid="feedback-text">{ feedbacksMessages.beBetter }</p>}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  receiveNewToken: PropTypes.func,
  questions: PropTypes.array,
  player: PropTypes.object,
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
