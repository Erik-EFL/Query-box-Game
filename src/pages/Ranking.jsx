import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../Css/Ranking.module.css';
import Footer from '../components/Footer';
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
      <div className={ styles.ranking_page }>
        <div className={ styles.header_ranking }>
          <h1 data-testid="ranking-title"> Ranking </h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleHome }
          >
            Go Home
          </button>
        </div>
        <div className={ styles.ranking_container }>
          {this.rankList().map((player) => (
            <table
              key={ player.index }
              className={ styles.ranking_table }
            >
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={ styles.ranking_name }>
                    <img
                      src={ player.gravatar }
                      alt={ `gravatar${player.index}` }

                    />
                    <p
                      data-testid={ `player-name-${player.index}` }
                    >
                      {player.name}
                    </p>
                  </td>
                  <td className={ styles.ranking_score }>
                    <p
                      data-testid={ `player-score-${player.index}` }

                    >
                      {player.score}

                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
          <Footer className="footer" />
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
