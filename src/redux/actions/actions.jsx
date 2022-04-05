import { LOGIN, API_REQUEST_SUCCESS, REQUEST_ERROR } from './actionsType';

export const login = (email, nome) => ({
  type: LOGIN,
  email,
  nome,
});

export const requestAPI = () => ({
  type: API_REQUEST_SUCCESS,
});

export const apiError = (error) => ({
  type: REQUEST_ERROR,
  error,
});
