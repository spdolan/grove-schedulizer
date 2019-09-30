import emptyCalendarObject from '../data/emptyCalendarObject.json';
import { ADD_TASKS } from '../actions';

const defaultCalendar = emptyCalendarObject;

export default function (state = defaultCalendar, action) {
  // check to see if errors exist within our action, return if so
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case ADD_TASKS:
      return action.payload
    default:
      return state;
  }
}