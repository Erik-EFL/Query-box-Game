import { LOGIN, QUESTION_POINTS } from '../actions/actionsType';

const INICIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
// const { score/* , assertions */ } = INICIAL_STATE;
// window.localStorage.setItem('player', score);

const player = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
      name: action.name,
    };
  case QUESTION_POINTS:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default player;
