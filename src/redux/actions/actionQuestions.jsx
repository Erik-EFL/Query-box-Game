import fetchDataQuestions from '../../Services/fetchQuestions';
import {
  REQUEST_QUESTIONS, ALEATORY_QUESTS, REQUEST_ERROR,
} from './actionsType';

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const receiveQuestions = (questions) => ({
  type: ALEATORY_QUESTS,
  questions,
});

export const receiveFailQuestions = (error) => ({
  type: REQUEST_ERROR,
  error,
});

export const questionDataThunk = () => async (dispatch, getState) => {
  dispatch(requestQuestions());
  const state = getState();
  const { token } = state;
  try {
    const results = await fetchDataQuestions(token);
    dispatch(receiveQuestions(results));
  } catch (error) {
    dispatch(receiveFailQuestions(error));
  }
};
