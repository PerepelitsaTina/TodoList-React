import { combineReducers } from 'redux';
import todos from './todos/reducer';
import filter from './filter/reducer';

export const rootReducer = combineReducers({
  todosStore: todos,
  filterStore: filter
});
