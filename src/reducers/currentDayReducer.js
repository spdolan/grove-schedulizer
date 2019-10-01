import { SET_CURRENT_DAY } from '../actions';

export default function (state = Date.now(), action) {
  // check to see if errors exist within our action, return if so
  if (action.error) {
    return (action.error);
  }

  switch (action.type) {
    case SET_CURRENT_DAY:
      return action.payload
    default:
      return state;
  }
}