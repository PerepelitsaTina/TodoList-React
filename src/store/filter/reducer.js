import { SET_FILTER } from '../actionTypes/actionTypes'
import { visibilityFilters } from '../constants/visibilityFilters';

const initialState = {
  filter: visibilityFilters.SHOW_ALL
}

export default function filter(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      }
    default:
      return state;
  }
}