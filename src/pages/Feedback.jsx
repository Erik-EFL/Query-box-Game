import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import styles from '../Css/Feedback.module.css';
import Header from '../components/Header';

// import { feedbacksMessages /* INICIAL_STATE */ } from './helpers';

class Feedback extends Component {
  gravatarHash = (userEmail) => {
    const convertEmail = md5(userEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertEmail}`;
    return gravatarUrl;
  }

  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  saveStoreRanking = () => {
    const { player: { gravatarEmail, score, name } } = this.props;
    const gravatarLink = this.gravatarHash(gravatarEmail);
    const currentStorage = JSON.parse(localStorage.getItem('ranking'));
    const conteudo = [{
      index: 0,
      gravatar: gravatarLink,
      score,
      name,
    }];
    if (!currentStorage) {
      localStorage.setItem('ranking', JSON.stringify(conteudo));
    }
    if (currentStorage) {
      conteudo[0].index = currentStorage.length;
      currentStorage.push(...conteudo);
      localStorage.setItem('ranking', JSON.stringify(currentStorage));
    }
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div className="feedback-page">
        {this.saveStoreRanking()}
        {/* <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link> */}
        <Header />
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
          <hr />
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleRanking }
          >
            Ranking
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgain }
          >
            Play Again
          </button>
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
  history: PropTypes.func,
  score: PropTypes.number,
  assertions: PropTypes.number,
  player: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
