import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from '../Css/Timer.module.css';
import timerIcon from '../Css/assets/timer.png';
import '../Css/Questions.module.css';

class Timer extends React.Component {
  render() {
    const { timerQuestion } = this.props;
    return (
      <div className={ styles.timer_container }>
        <span className={ styles.timer_text }>{ timerQuestion }</span>
        <img className={ styles.timer_icon } src={ timerIcon } alt="timer" />
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
