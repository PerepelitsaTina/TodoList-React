import * as actionTypes from '../actionTypes/actionTypes'

export const createTodo = (todo) => ({
    type: actionTypes.CREATE_TODO,
    payload: todo
});
export const editTodo = (id, title) => ({
    type: actionTypes.EDIT_TODO,
    payload: { id, title }
});
export const deleteTodo = (id) => ({
    type: actionTypes.DELETE_TODO,
    payload: id
});
export const updateTodo = (todo) => ({
    type: actionTypes.UPDATE_TODO,
    payload: todo
});
export const completeAllTodos = () => ({
    type: actionTypes.COMPLETE_ALL_TODOS
});
export const clearCompleted = () => ({
    type: actionTypes.CLEAR_COMPLETED
});
