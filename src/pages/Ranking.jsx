import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../Css/Ranking.module.css';
import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';
import goldMedal from '../Css/assets/medalha-de-ouro.png';
import silverMedal from '../Css/assets/medalha-de-prata.png';
import bronzeMedal from '../Css/assets/medalha-de-bronze.png';

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

  medalSwitch = (score, index) => {
    const rank = this.rankList();
    switch (score) {
    case rank[0].score:
      return (<img src={ goldMedal } alt="gold-medal" />);
    case rank[1].score:
      return (<img src={ silverMedal } alt="silver-medal" />);
    case rank[2].score:
      return (<img src={ bronzeMedal } alt="bronze-medal" />);
    default:
      return (<span className={ styles.ranking_number }>{`${index}°`}</span>);
    }
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
          {this.rankList().map((player, index) => (
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
                    {this.medalSwitch(player.score, index + 1)}
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

/* <a href="https://www.flaticon.com/br/icones-gratis/medalha-de-bronze" title="medalha de bronze ícones">Medalha de bronze ícones criados por Freepik - Flaticon</a> */

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
