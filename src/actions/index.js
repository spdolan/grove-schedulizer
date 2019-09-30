// import our relevant services
import getTasksData from '../services/getTasksData';
import addDatesToCalendarFromCron from '../services/addDatesToCalendarFromCron';

// some syntactic sugar here for us to auto-complete action types elsewhere
export const GET_TASKS = 'GET_TASKS';
export const UPDATE_CALENDAR = 'UPDATE_CALENDAR';
export const SET_CURRENT_DAY = 'SET_CURRENT_DAY';

export const getTasks = () => dispatch => {
  // promise from our service axios call to tasks endpoint 
  getTasksData()
    .then((response) => {
      // callback service to update tasks array with parsed Cron interval
      dispatch({ type: GET_TASKS, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateCalendarFromTasksCron = (currentTaskList, currentCalendar) => dispatch => {
  addDatesToCalendarFromCron(currentTaskList, currentCalendar)
    .then((response) => {
      // callback service to update tasks array with parsed Cron interval
      dispatch({ type: UPDATE_CALENDAR, payload: response });
    })
    .catch((error) => {
      console.log(error);
    });
}