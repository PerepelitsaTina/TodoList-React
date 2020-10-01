import uuidv4 from 'uuid/dist/v4'

import {
  SET_FILTER
} from '../constants/actionTypes'

const initialState = {
  visibleFilter: 'all'
}

export default function filter(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        visibleFilter: action.payload
      }
    default:
      return state;
  }
}