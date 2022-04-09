import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';

class Ranking extends Component {
  handleHome = () => {
    const { history } = this.props;
    history.push('/');
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
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
