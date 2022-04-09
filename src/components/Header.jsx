import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import styles from '../Css/Header.module.css';

class Header extends Component {
  gravatarHash = (userEmail) => {
    const convertEmail = md5(userEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertEmail}`;
    return gravatarUrl;
  }

  render() {
    const { player: { name, gravatarEmail, score } } = this.props;

    return (
      <header className={ styles.user_header }>
        <img
          className={ styles.user_image }
          src={ this.gravatarHash(gravatarEmail) }
          data-testid="header-profile-picture"
          alt="profile-avatar"
        />
        <div className={ styles.user_info }>
          <div className={ styles.player_container }>
            <span className={ styles.jogador }> Player</span>
            <p data-testid="header-player-name">{name}</p>
          </div>
          <div className={ styles.score_container }>
            <span className={ styles.pontos }> Score</span>
            <p data-testid="header-score">{score}</p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  receiveNewToken: PropTypes.func,
  questions: PropTypes.array,
  player: PropTypes.object,
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Header);
