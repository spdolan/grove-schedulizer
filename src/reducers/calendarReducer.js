import emptyCalendarObject from '../data/emptyCalendarObject.json';
import { UPDATE_CALENDAR } from '../actions';

export default function (state = emptyCalendarObject, action) {
  // check to see if errors exist within our action, return if so
  if (action.error) {
    return (action.error);
  }
  
  switch (action.type) {
    case UPDATE_CALENDAR:
      return action.payload
    default:
      return state;
  }
}