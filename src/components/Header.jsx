import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  gravatarHash = (userEmail) => {
    const convertEmail = md5(userEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertEmail}`;
    return gravatarUrl;
  }

  render() {
    const { player: { name, gravatarEmail } } = this.props;

    return (
      <header className="user-header">
        <img
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
          <h2 data-testid="header-score">0</h2>
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
