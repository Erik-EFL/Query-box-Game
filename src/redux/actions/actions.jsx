import {
  API_REQUEST_SUCCESS,
  LOGIN, QUESTION, QUESTION_DONE, REQUEST_ERROR, TOKEN
} from './actionsType';

export const login = (gravatarEmail, name) => ({
  type: LOGIN,
  gravatarEmail,
  name,
});

export const question = (score, assertions) => ({
  type: QUESTION,
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

export const questionDone = (bool) => ({
  type: QUESTION_DONE,
  responded: bool,
});
