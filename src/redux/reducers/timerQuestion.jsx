import { TIMER_INTERVAL, TIMER_QUESTION } from '../actions/actionsType';

const INICIAL_STATE = {
  timer: 30,
};

const timerQuestion = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_QUESTION:
    return {
      timer: action.timer };
  case TIMER_INTERVAL:
    return {
      interval: action.interval };
  default:
    return state;
  }
};

export default timerQuestion;
