const parser = require('cron-parser');

// time boxing our calendar for the app - these could be .env values
const options = {
  currentDate: '2019-11-01 00:00:00',
  endDate: '2019-11-30 23:59:59',
  tz: 'America/New_York',
  iterator: true
};

const addDatesToCalendarFromCron = (tasksArray, currentCalendarObject) => {
  return new Promise((resolve, reject) => {
    
    const updatedCalendarObject = currentCalendarObject;
    // loop over each task
    tasksArray.forEach(taskObject => {
      // extract task ID and Duration from each taskObject
      const { id, duration} = taskObject;
      // extract our cron string and task name from each taskObject
      const { cron, name } = taskObject.attributes;   
      
      try {
        const interval = parser.parseExpression(cron, options);
        // boolean is from the library's interval.next().done property
        while (options.iterator) {
          try {
            const obj = interval.next();
            // console.log(obj.value);
            // TODO: check actual getter within Moment library
            updatedCalendarObject[obj.value._date.format('L')].push({
              'taskId': id,
              'taskName': name,
              'taskStartTime': obj.value._date.format('HHmm'),
              'taskDateTime':obj.value.toString(),
              'taskDuration': duration
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