import { requestAPI } from './actions';
import token from '../helper';

const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  dispatch(/* insira a function que recebe o data */(data));
};

export default fetchAPI;
