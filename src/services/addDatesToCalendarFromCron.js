const parser = require('cron-parser');
const R = require('ramda');
// time boxing our calendar for the app - these could be .env values
const options = {
  currentDate: '2019-07-04 00:00:01',
  endDate: '2020-07-04 23:59:59',
  tz: 'America/New_York',
  iterator: true
};

const addDatesToCalendarFromCron = (tasksArray, currentCalendarObject) => {
  return new Promise((resolve, reject) => {
    // using Ramda here to use the library's default clone operation
    const updatedCalendarObject = R.clone(currentCalendarObject);
    // loop over each task
    tasksArray.forEach(taskObject => {
      // extract our cron string from each taskObject
      const taskObjectId = taskObject.id;
      const taskCronString = taskObject.attributes.cron;
      const taskObjectName = taskObject.attributes.name;
      
      try {
        const interval = parser.parseExpression(taskCronString, options);
        // boolean is from the library's interval.next().done property
        while (options.iterator) {
          try {
            const obj = interval.next();
            // console.log(obj.value);
            // TODO: check actual getter within Moment library
            updatedCalendarObject[obj.value._date.format('L')].push({
              'taskId': taskObjectId,
              'taskName': taskObjectName,
              'taskDateTime':obj.value.toString()
            });
          } catch (error) {
            break;
          }
        }
      } catch (error) {
        reject('Error: ' + error.message);
      }

      resolve(updatedCalendarObject);
    });  
  });
}

export default addDatesToCalendarFromCron;