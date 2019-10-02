import moment from 'moment-timezone';
// import our relevant services
import getTasksData from '../services/getTasksData';
import addDatesToCalendarFromCron from '../services/addDatesToCalendarFromCron';
import addTaskDurationInHours from '../services/addTaskDurationInHours';
import notify from '../services/notifications';

// some syntactic sugar here for us to auto-complete action types elsewhere
export const GET_TASKS = 'GET_TASKS';
export const UPDATE_CALENDAR = 'UPDATE_CALENDAR';
export const SET_CURRENT_DATE = 'SET_CURRENT_DATE';
export const REQUEST_NOTIFICATION_PERMISSION = 'REQUEST_NOTIFICATION_PERMISSION';

export const getTasks = () => dispatch => {
  // promise from our service axios call to tasks endpoint 
  getTasksData()
  .then((response) => {
    //service to update tasks array with duration in Hours
    return addTaskDurationInHours(response.data);
  })
  .then((response) => {
    dispatch({ type: GET_TASKS, payload: response });
  })
  .catch((error) => {
    console.log(error);
  });
};

export const updateCalendarFromTasksCron = (currentTaskList, currentCalendar) => dispatch => {
  addDatesToCalendarFromCron(currentTaskList, currentCalendar)
  .then((response) => {
    //service to update tasks array with parsed Cron interval
    dispatch({ type: UPDATE_CALENDAR, payload: response });
  })
  .catch((error) => {
    console.log(error);
  });
}

export const setCurrentDateFromCalendar = (dateString) => dispatch => {
  // if selected date is current date, we will keep the current time
  const updatedCurrentDate = dateString !== moment().format("MM/DD/YYYY") ? moment(dateString, 'MM/DD/YYYY') : moment(new Date());
  dispatch({type: SET_CURRENT_DATE, payload: updatedCurrentDate});
}

export const requestNotificationPermission = () => dispatch => {
  notify()
  .then((response) => {
    dispatch({ type: REQUEST_NOTIFICATION_PERMISSION, payload: response });
  })
}