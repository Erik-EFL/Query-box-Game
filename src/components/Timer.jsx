import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from '../Css/Timer.module.css';
import timerIcon from '../Css/assets/timer.png';
import timerZero from '../Css/assets/timerZero.gif';
import '../Css/Questions.module.css';

class Timer extends React.Component {
  timerAnimation = () => {
    const { timerQuestion } = this.props;
    if (timerQuestion > 0) {
      return (
        <img className={ styles.timer_icon } src={ timerIcon } alt="timer" />
      );
    }
    return (
      <img className={ styles.timer_icon } src={ timerZero } alt="timer" />
    );
  }

  render() {
    const { timerQuestion } = this.props;
    const time = (`00${timerQuestion}`).slice(Number('-2'));
    return (
      <div className={ styles.timer_container }>
        <span className={ styles.timer_text }>{ time }</span>
        {this.timerAnimation()}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    questionOk: state.questionDone.responded,
    questionNumber: state.questionDone.questionNumber,
    timerQuestion: state.timerQuestion.timer,
  }
);

Timer.propTypes = {
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Timer);
