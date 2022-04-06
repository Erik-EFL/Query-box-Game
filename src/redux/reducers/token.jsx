import { TOKEN } from '../actions/actionsType';

const INICIAL_STATE = {
  token: '',
};

const token = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return action.token;
  default:
    return state;
  }
};

export default token;
