import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  render() {
    const { player: { nome, image } } = this.props;
    return (
      <div>
        <header>
          <img
            src={ image }
            data-testid="header-profile-picture"
            alt="profile-avatar"
          />
          <span data-testid="header-player-name">{nome}</span>
          <span data-testid="header-score">0</span>
        </header>
        Questions
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Questions.propTypes = {
  player: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Questions);
