import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from '../Css/Timer.module.css';
import { questionDone } from '../redux/actions/actions';
import timerIcon from '../timer.png';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    setInterval(this.startWatch, oneSecond);
  }

  startWatch = () => {
    const { timer } = this.state;
    const { questionResponded } = this.props;
    const { questionOk } = this.props;
    if (timer > 0 && questionOk === false) {
      this.setState({ timer: timer - 1 });
    } else {
      questionResponded(true);
      this.setState({ timer: 30 });
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div className={ styles.timer_container }>
        <span className={ styles.timer_text }>{ timer }</span>
        <img className={ styles.timer_icon } src={ timerIcon } alt="timer" />
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
  questionResponded: (bool) => dispatch(questionDone(bool)),
});

Timer.propTypes = {
  questionOk: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
