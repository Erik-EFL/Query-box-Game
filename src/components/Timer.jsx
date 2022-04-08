import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { questionDone } from '../redux/actions/actions';
import timerIcon from '../timer.png';
import './Timer.css';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    const interval = setInterval(this.startWatch, oneSecond);
    this.setState({ interval });
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  startWatch = () => {
    const { timer, interval } = this.state;
    const { questionResponded, questionOk } = this.props;
    if (timer > 0 && questionOk === false) {
      this.setState({ timer: timer - 1 });
    } else {
      questionResponded(true, timer);
      clearInterval(interval);
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="timer-container">
        <span className="timer-text">{ timer }</span>
        <img className="timer-icon" src={ timerIcon } alt="timer" />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    questionOk: state.questionDone.responded,
    questionNumber: state.questionDone.questionNumber,
  }
);

const mapDispatchToProps = (dispatch) => ({
  questionResponded: (bool, time) => dispatch(questionDone(bool, time)),
});

Timer.propTypes = {
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
