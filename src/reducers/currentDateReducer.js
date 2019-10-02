import moment from 'moment-timezone';
import { SET_CURRENT_DATE } from '../actions';
const currentDate = moment(new Date());

export default function (state = currentDate, action) {
  // check to see if errors exist within our action, return if so
  if (action.error) {
    return (action.error);
  }

  switch (action.type) {
    case SET_CURRENT_DATE:
      console.log('acting: ', action.payload);
      return action.payload
    default:
      return state;
  }
}