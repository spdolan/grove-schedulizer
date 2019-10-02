import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import calendarReducer from "./calendarReducer";
import currentDateReducer from "./currentDateReducer";
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  calendar: calendarReducer,
  currentDate: currentDateReducer,
  acceptsNotifications: notificationReducer
});

export default rootReducer;