import {
  API_REQUEST_SUCCESS,
  LOGIN,
  QUESTION_POINTS,
  QUESTION_DONE,
  REQUEST_ERROR,
  TOKEN,
  TIMER_QUESTION,
  TIMER_INTERVAL,
} from './actionsType';

export const login = (gravatarEmail, name) => ({
  type: LOGIN,
  gravatarEmail,
  name,
});

export const questionPoints = (score, assertions) => ({
  type: QUESTION_POINTS,
  score,
  assertions,
});

export const tokenLogin = (token) => ({
  type: TOKEN,
  token,
});

export const requestAPI = () => ({
  type: API_REQUEST_SUCCESS,
});

export const apiError = (error) => ({
  type: REQUEST_ERROR,
  error,
});

export const questionDone = (bool, time) => ({
  type: QUESTION_DONE,
  responded: bool,
  time,
});

export const timerAction = (timer) => ({
  type: TIMER_QUESTION,
  timer,
});

export const intervalAction = (interval) => ({
  type: TIMER_INTERVAL,
  interval,
});
