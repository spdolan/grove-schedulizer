const parser = require('cron-parser');

// time boxing our calendar for the app - these could be .env values
const options = {
  currentDate: '2019-07-04 00:00:01',
  endDate: '2020-07-04 23:59:59',
  tz: 'America/New_York',
  iterator: true
};

const cronConvert = (cronString) => {
  try {
    const interval = parser.parseExpression(cronString, options);
    // boolean is from the library's interval.next().done property
    while (true) {
      try {
        const obj = interval.next();
        console.log(obj.value);
        console.log('value:', obj.value._date.format('L'), 'done:', obj.done);
      } catch (e) {
        break;
      }
    }
    return interval;
  } catch (err) {
    console.log('Error: ' + err.message);
  }
}

export default cronConvert;