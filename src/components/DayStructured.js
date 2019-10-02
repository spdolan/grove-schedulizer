import React from 'react';
import { } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Notifier from './Notifier';

class DayStructured extends React.Component {
  constructor(props) {
    super(props);
    this.renderTasks = this.renderTasks.bind(this); 
    this.formatCurrentDate = this.formatCurrentDate.bind(this);
    this.sortCurrentDayTasks = this.sortCurrentDayTasks.bind(this);
    this.grabTaskHoursFromCurrentDayObject = this.grabTaskHoursFromCurrentDayObject.bind(this);
    this.hourOfTimeFormattedString = this.hourOfTimeFormattedString.bind(this);
    this.grabTasksForHour = this.grabTasksForHour.bind(this);
    this.formatTasksToDiv = this.formatTasksToDiv.bind(this);
  }
  // return a string formatted MM/DD/YYYY based on our currentDate store property
  formatCurrentDate(momentDayObject) {
    let formattedCurrentDate = '';
    let formattedCurrentDay = '';
    let formattedCurrentMonth = '';
    if (momentDayObject._a) {
      // check if Moment's zero-based months are before October, and prepend a 0
      formattedCurrentMonth = (momentDayObject._a[1] + 1) < 10 ?
        `0${(momentDayObject._a[1] + 1)}` :
        (momentDayObject._a[1] + 1);
      // check if current date is before the 10th, and prepend a 0
      formattedCurrentDay = (momentDayObject._a[2]) < 10 ?
        `0${(momentDayObject._a[2])}` :
        (momentDayObject._a[2]);
      // interpolate our formatted Month/Day/Year
      formattedCurrentDate = `${formattedCurrentMonth}/${formattedCurrentDay}/${momentDayObject._a[0]}`
    } else {
      // check if Moment's zero-based months are before October, and prepend a 0
      formattedCurrentMonth = (this.props.currentDate._i.getMonth() + 1) < 10 ?
        `0${(this.props.currentDate._i.getMonth() + 1)}` :
        (this.props.currentDate._i.getMonth() + 1);
      // check if current date is before the 10th, and prepend a 0
      formattedCurrentDay = (this.props.currentDate._i.getDate()) < 10 ?
        `0${(this.props.currentDate._i.getDate())}` :
        (this.props.currentDate._i.getDate());

      formattedCurrentDate = `${formattedCurrentMonth}/${formattedCurrentDay}/${momentDayObject.format("YYYY")}`;
    }
    return formattedCurrentDate;
  }

  sortCurrentDayTasks(arrayOfTaskObjects){
    return arrayOfTaskObjects.sort(function (a, b) {
      return a.taskStartTime - b.taskStartTime;
    })
  }

  grabTaskHoursFromCurrentDayObject(arrayOfTaskObjects){
    const taskHours = arrayOfTaskObjects.map(taskObject => taskObject.taskStartTime); 
    // grab only on-the-hour times (XX00)
    const taskHourTimes = taskHours.filter(taskHour => {
      return taskHour % 100 === 0;
    });
    const uniqueHourTimes = new Set(taskHourTimes);
    return Array.from(uniqueHourTimes);
  }

  hourOfTimeFormattedString(twentyFourHourTimeString){
    return twentyFourHourTimeString.substr(0,2);
  }

  grabTasksForHour(hourString, arrayOfTaskObjects){
    return arrayOfTaskObjects.filter(taskObject => {
      return this.hourOfTimeFormattedString(hourString) === this.hourOfTimeFormattedString(taskObject.taskStartTime);
    })
  }

  // create a div within relevant class names based upon the task
  formatTasksToDiv(arrayOfTasks){
    const arrayOfTaskDivs = [];
    arrayOfTasks.forEach(taskObject => {
      const { taskId, taskDuration, taskStartTime, taskName } = taskObject;
      const taskClasses = `task task_Color_${taskId} task_Duration_${taskDuration}`;
      if (taskName === "Farmer's Market" && taskStartTime === '0000') {
        arrayOfTaskDivs.push(<div className={taskClasses} key={`${taskId}-${taskStartTime}`}>{taskName}</div>);
      }
      else if (taskStartTime > '0400') {
        arrayOfTaskDivs.push(<div className={`${taskClasses} task_Start_${taskStartTime}`} key={`${taskId}-${taskStartTime}`}>{taskName}</div>);
      }
    });
    return arrayOfTaskDivs;
  }

  renderTasks(){
    // format our date then grab tasks from our calendar object
    const formattedDate = this.formatCurrentDate(this.props.currentDate);
    const currentDayTasks = this.props.calendar[formattedDate];
    // if our current day actually has tasks, proceed with formatting/displaying
    if(currentDayTasks.length > 0){
      // sort our current day tasks by time started
      const sortedCurrentDayTasks = this.sortCurrentDayTasks(currentDayTasks);
      const currentDayHoursWithTasks = this.grabTaskHoursFromCurrentDayObject(sortedCurrentDayTasks);
      // map over each applicable hour, and place each task within that Hour's div
      const formattedTaskDivs = currentDayHoursWithTasks.map(taskHour => {
        const tasksForCurrentHour = this.grabTasksForHour(taskHour, sortedCurrentDayTasks);
        const currentTasksDiv = this.formatTasksToDiv(tasksForCurrentHour);
        const currentHourDiv = 
          <div className='dayStructured_hour' key={taskHour}>
            <span className='dayStructured_hour_marker'><span className='dayStructured_hour_marker_text'>{taskHour}</span> <hr></hr></span>
            <div className={`dayStructured_hour_tasks_${taskHour}`}>
              {currentTasksDiv}
            </div>
          </div>
        return currentHourDiv;
      });

      return formattedTaskDivs;
    }  
    // let's put a loading notification here.
  }


  render(){
    return(
      <div className='dayStructured'>
        <Notifier />
        {this.renderTasks()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    currentDate: state.currentDate,
    calendar: state.calendar
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DayStructured);