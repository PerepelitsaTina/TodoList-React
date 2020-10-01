import * as actionTypes from '../constants/actionTypes'

export const createTodo = (title) => ({type: actionTypes.CREATE_TODO, title});
export const editTodo = (id, title) => ({type: actionTypes.EDIT_TODO, id, title});
export const deleteTodo = (id) => ({type: actionTypes.DELETE_TODO, id});
export const completeTodo = (id) => ({type: actionTypes.COMPLETE_TODO, id});
export const completeAllTodos = () => ({type: actionTypes.COMPLETE_ALL_TODOS});
export const clearCompleted = () => ({type: actionTypes.CLEAR_COMPLETED});
export const setFilter = (filter) => ({type: actionTypes.SET_FILTER, filter}); 