import { LOGIN } from '../actions/actionsType';

const INICIAL_STATE = {
  nome: '',
  image: '',
};

const player = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
      nome: action.nome,
      image: action.image,
    };
  default:
    return state;
  }
};

export default player;
