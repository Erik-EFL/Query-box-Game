import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import styles from '../Css/Feedback.module.css';
// import { feedbacksMessages /* INICIAL_STATE */ } from './helpers';

class Feedback extends Component {
  gravatarHash = (userEmail) => {
    const convertEmail = md5(userEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertEmail}`;
    return gravatarUrl;
  }

  render() {
    const { player: { name, gravatarEmail } } = this.props;
    const { score, assertions } = this.props;
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
        <main className={ styles.container_feedback }>
          <div className={ styles.feedback_container }>
            {assertions
          && assertions >= Number('3')
              ? <h2 data-testid="feedback-text">Well Done!</h2>
              : (
                <h2 data-testid="feedback-text">
                  Could be better...
                </h2>
              )}
            <hr />
            <p
              data-testid="feedback-total-question"
            >
              {assertions}

            </p>
            <p
              data-testid="feedback-total-score"
            >
              {score}

            </p>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  receiveNewToken: PropTypes.func,
  questions: PropTypes.array,
  score: PropTypes.number,
  assertions: PropTypes.number,
  player: PropTypes.object,
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
