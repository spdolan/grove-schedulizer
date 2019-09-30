const parser = require('cron-parser');

const cronConvert = (cronString) => {
  try {
    const interval = parser.parseExpression(cronString);
    return interval;
  } catch (err) {
    console.log('Error: ' + err.message);
  }
}

export default cronConvert;