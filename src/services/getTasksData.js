import axios from 'axios';

const getTasksData = () => {

  const tasksData = axios.get(`https://scheduler-challenge.grove.co/`);

  // let's put in an error checker here
  if(tasksData.error){
    return tasksData.error;
  }

  // wrap in a Promise since we're completing our initial development offline
  return Promise.resolve(tasksData);
}

export default getTasksData;