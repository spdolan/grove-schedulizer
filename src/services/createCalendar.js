const fs = require('fs');

// time boxing our calendar for the app - these could be .env values
const startDate = new Date("07/04/2019"); 
const endDate = new Date("07/03/2020");
const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; 
const cal = {};

const getDateObject = function (start, end) {
  const dt = new Date(start);
  while (dt <= end) {
    cal[new Date(dt).toLocaleDateString("en-US", options)] = [];
    dt.setDate(dt.getDate() + 1);
  }
}

getDateObject(startDate, endDate);
// console.log(cal);

const jsonContent = JSON.stringify(cal);
fs.writeFile("src/data/emptyCalendarObject.json", jsonContent, 'utf8', function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }

  console.log("JSON file has been saved.");
});