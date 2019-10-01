import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import calendarReducer from "./calendarReducer";
import currentDateReducer from "./currentDateReducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  calendar: calendarReducer,
  currentDate: currentDateReducer
});

export default rootReducer;