import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';

class Ranking extends Component {
  handleHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  rankList = () => {
    const param = -1;
    const currentStorage = JSON.parse(localStorage.getItem('ranking'));
    const rank = currentStorage.sort((a, b) => {
      if (a.score > b.score) {
        return param;
      }
      return true;
    }); // organiza o rank pelo score
    return rank;
  }

  render() {
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title"> Ranking </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleHome }
        >
          Go Home
        </button>
        {this.rankList().map((player) => (
          <div key={ player.index }>
            <img src={ player.gravatar } alt={ `gravatar${player.index}` } />
            <p data-testid={ `player-name-${player.index}` }>{player.name}</p>
            <p data-testid={ `player-score-${player.index}` }>{player.score}</p>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
