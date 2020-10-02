import uuidv4 from 'uuid/dist/v4'

import {
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED
} from '../actionTypes/actionTypes'

const initialState = {
  todos: []
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            title: action.payload,
            isCompleted: false
          }
        ]
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo =>
          todo.id !== action.payload
        )
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        })
      };

    case COMPLETE_ALL_TODOS: {
      const areAllCompleted = state.todos.every(todo => todo.isCompleted);
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          isCompleted: !areAllCompleted
        }))
      };
    }

    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.isCompleted)
      };

    default:
      return state;
  }
}