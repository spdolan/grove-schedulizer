import { REQUEST_NOTIFICATION_PERMISSION } from '../actions';

export default function (state = null, action) {
  // check to see if errors exist within our action, return if so
  if (action.error) {
    return (action.error);
  }

  switch (action.type) {
    case REQUEST_NOTIFICATION_PERMISSION:
      return action.payload
    default:
      return state;
  }
}