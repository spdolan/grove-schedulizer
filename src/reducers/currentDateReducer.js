import moment from 'moment';
import { SET_CURRENT_DATE } from '../actions';
const default_date = moment().tz("America/New_York");
export default function (state = default_date, action) {
  // check to see if errors exist within our action, return if so
  if (action.error) {
    return (action.error);
  }

  switch (action.type) {
    case SET_CURRENT_DATE:
      return action.payload
    default:
      return state;
  }
}