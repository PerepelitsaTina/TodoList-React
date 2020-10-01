import uuidv4 from 'uuid/dist/v4'

import {
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED
} from '../constants/actionTypes'

const initialState = [];
export default function todos(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO:
      return [
        ...state,
        {
          id: uuidv4(),
          isCompleted: false,
          title: action.title
        }
      ];


    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      );

    case COMPLETE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    
    case COMPLETE_ALL_TODOS:
      const areAllCompleted = state.every(todo => todo.isCompleted);
      return state.map(todo => ({
        ...todo, isCompleted: !areAllCompleted
      }));

    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.isCompleted);

    default:
      return state;
  }
}