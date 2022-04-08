import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import questions from './questions';
import questionDone from './questionDone';

const rootReducer = combineReducers({
  player, token, questions, questionDone,
});

export default rootReducer;
