import axios from 'axios';
import data from '../data/tasks.json';

const getTasks = () => {
  // for offline use TODO: remove before submission
  const tasksData = data;

  // const tasksData = axios.get(`https://scheduler-challenge.grove.co/`);
  // let's put in an error checker here
  
  // wrap in a Promise since we're completing our initial development offline
  return Promise.resolve(tasksData);
}

module.exports = getTasks;