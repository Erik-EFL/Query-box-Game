import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import questions from './questions';
import questionDone from './questionDone';
import timerQuestion from './timerQuestion';

const rootReducer = combineReducers({
  player, token, questions, questionDone, timerQuestion,
});

export default rootReducer;
