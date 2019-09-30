import cronConvert from './cronConvert';

const addDatesToTasksFromCron = (tasksArray) => {

  // map to return array of task objects
  const updatedTasksArray = tasksArray.map(taskObject => {
    // extract our cron string from each taskObject
    const taskCron = taskObject.attributes.cron;
    // convert to a plain Date(s) within an array
    const taskCronDateInterval = cronConvert(taskCron);
    // we'll add that Date(s) array and return our update taskObject
    taskObject.attributes.interval = taskCronDateInterval;
    // may need to flatten for React to access our task information
    return taskObject;
  });

  return updatedTasksArray;
}

export default addDatesToTasksFromCron;