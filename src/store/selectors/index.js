import { createSelector } from 'reselect';
import { visibilityFilters } from '../constants/visibilityFilters';

const getFilter = (state) => state.filterStore.filter;
const getTodos = (state) => state.todosStore.todos;

export const showFilteredTodos = createSelector(
  [getFilter, getTodos],
  (filter, todos) => {
    switch (filter) {
      case visibilityFilters.SHOW_ALL:
        return todos;
      case visibilityFilters.SHOW_ACTIVE:
        return todos.filter((todo) => !todo.isCompleted);
      case visibilityFilters.SHOW_COMPLETED:
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  }
);
