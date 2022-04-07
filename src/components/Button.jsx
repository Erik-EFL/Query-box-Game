import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { key, idQ, answers } = this.props;
    return (
      <div>
        <button type="button" key={ key } data-testid={ idQ }>
          { answers }
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  key: PropTypes.number,
  idQ: PropTypes.string,
  answers: PropTypes.string,
}.isRequired;

export default Button;
