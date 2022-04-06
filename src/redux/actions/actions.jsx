import { API_REQUEST_SUCCESS, LOGIN, REQUEST_ERROR, TOKEN } from './actionsType';

export const login = (email, nome, image) => ({
  type: LOGIN,
  email,
  nome,
  image,
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
