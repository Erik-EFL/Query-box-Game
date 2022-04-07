import {
  ALEATORY_QUESTS, REQUEST_ERROR,
} from '../actions/actionsType';

const INICIAL_STATE = {
  questions: [],
  error: '',
};

const questions = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case ALEATORY_QUESTS:
    return {
      ...state,
      questions: action.questions };
  case REQUEST_ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default questions;
