import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import calendarReducer from "./calendarReducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  calendar: calendarReducer
});

export default rootReducer;