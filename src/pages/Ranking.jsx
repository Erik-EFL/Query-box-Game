import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title"> Ranking </h1>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Go Home</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
