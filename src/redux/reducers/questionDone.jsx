import {
  QUESTION_DONE,
} from '../actions/actionsType';

const INICIAL_STATE = {
  responded: false,
  questionNumber: 0,
};

const questionDone = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case QUESTION_DONE:
    return {
      responded: action.responded };
  default:
    return state;
  }
};

export default questionDone;
