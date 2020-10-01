import uuidv4 from 'uuid/dist/v4'

import {
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED
} from '../constants/actionTypes'

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
          action.payload
        ]
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo =>
          todo.id !== action.payload
        )
      }

    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return { ...todo, isCompleted: !todo.isCompleted };
          }
          return todo;
        })
      }
    
    case COMPLETE_ALL_TODOS:
      const areAllCompleted = state.every(todo => todo.isCompleted);
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo, 
          isCompleted: !areAllCompleted
        }))
      }

    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.isCompleted)
      }

    default:
      return state;
  }
}