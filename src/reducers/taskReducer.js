import { GET_TASKS } from '../actions';

export default function (state = [], action) {
  // check to see if errors exist within our action, return if so
  if (action.error) {
    return (action.error);
  }

  switch (action.type) {
    case GET_TASKS:
      return action.payload
    default:
      return state;
  }
}