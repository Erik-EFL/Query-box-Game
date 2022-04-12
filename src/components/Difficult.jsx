import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Css/Footer.module.css';
import difLow from '../Css/assets/dif-low.png';
import difMedium from '../Css/assets/dif-medium.png';
import difHigh from '../Css/assets/dif-high.png';
import styles from '../Css/Difficult.module.css';

class Difficult extends Component {
  imageChoise = () => {
    const { difficult } = this.props;
    switch (difficult) {
    case 'easy':
      return (
        <img
          src={ difLow }
          alt={ `simbol-difficult-${difficult}` }
          className={ styles.difficult_container }
        />
      );
    case 'medium':
      return (
        <img
          src={ difMedium }
          alt={ `simbol-difficult-${difficult}` }
          className={ styles.difficult_container }
        />
      );
    case 'hard':
      return (
        <img
          src={ difHigh }
          alt={ `simbol-difficult-${difficult}` }
          className={ styles.difficult_container }
        />
      );
    default:
      return (<>?</>);
    }
  }

  render() {
    return (
      <div>
        {this.imageChoise()}
      </div>
    );
  }
}

Difficult.propTypes = {
  difficult: PropTypes.string,
}.isRequired;

export default Difficult;
