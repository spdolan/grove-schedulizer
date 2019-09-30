// import our relevant services
import getTasksData from '../services/getTasksData';
import addDatesToTasksFromCron from '../services/addDatesToTasksFromCron';

// some syntactic sugar here for us to auto-complete action types elsewhere
export const GET_TASKS = 'GET_TASKS';

export const getAndConvertTasks = () => dispatch => {

  // promise from our service axios call to tasks endpoint 
  getTasksData()
    .then((response) => {
      // callback service to update tasks array with parsed Cron interval
      const updatedTasksData = addDatesToTasksFromCron(response.data);
      dispatch({ type: GET_TASKS, payload: updatedTasksData });
    })
    .catch((error) => {
      console.log(error);
    });
};