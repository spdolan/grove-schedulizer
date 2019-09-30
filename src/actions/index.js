// import our relevant services
import getTasksData from '../services/getTasksData';
import addDatesToTasksFromCron from '../services/addDatesToTasksFromCron';

// some syntactic sugar here for us to auto-complete action types elsewhere
export const GET_TASKS = 'GET_TASKS';

export const getAndConvertTasks = () => dispatch => {

  getTasksData()
    .then((response) => {
      // console.log(response);
      // due to async, we will likely need to move this into our services
      const updatedTasksData = addDatesToTasksFromCron(response);
      dispatch({ type: GET_TASKS, payload: updatedTasksData });
    })
    .catch((error) => {
      console.log(error);
    });
};