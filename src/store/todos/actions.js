import {
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED
} from './actionTypes';

export const createTodo = (title) => ({
  type: CREATE_TODO,
  payload: title
});
export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});
export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo
});
export const completeAllTodos = () => ({
  type: COMPLETE_ALL_TODOS
});
export const clearCompleted = () => ({
  type: CLEAR_COMPLETED
});
