import React from 'react';
import { } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Notifier from './Notifier';

class DayStructured extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // use an array to create our hour lines - both midnights implied
      hours: [...Array(23).keys()].map(x => x+1)
    };

    this.renderTasks = this.renderTasks.bind(this); 
    this.formatCurrentDate = this.formatCurrentDate.bind(this);
    this.sortCurrentDayTasks = this.sortCurrentDayTasks.bind(this);
    this.grabTaskHoursFromCurrentDayObject = this.grabTaskHoursFromCurrentDayObject.bind(this);
    this.hourOfTimeFormattedString = this.hourOfTimeFormattedString.bind(this);
    this.grabTasksForHour = this.grabTasksForHour.bind(this);

  }

  componentDidMount(){    
  }

  formatCurrentDate(momentDayObject){
    let formattedCurrentDate = '';
    if (momentDayObject._a) {
      const formattedCurrentMonth = (momentDayObject._a[1] + 1) < 10 ?
        `0${(momentDayObject._a[1] + 1)}` :
        (momentDayObject._a[1] + 1);
      const formattedCurrentDay = (momentDayObject._a[2]) < 10 ?
        `0${(momentDayObject._a[2])}` :
        (momentDayObject._a[2]);
      formattedCurrentDate = `${formattedCurrentMonth}/${formattedCurrentDay}/${momentDayObject._a[0]}`
    } else {
      formattedCurrentDate = momentDayObject.format("MM/DD/YYYY");
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
    const taskHourTimes = taskHours.filter(taskHour => {
      return taskHour % 100 === 0;
    });
    const uniqueHourTimes = new Set(taskHourTimes)
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

  renderTasks(){
    const formattedDate = this.formatCurrentDate(this.props.currentDate);
    const currentDayTasks = this.props.calendar[formattedDate];
    if(currentDayTasks.length > 0){
      const sortedCurrentDayTasks = this.sortCurrentDayTasks(currentDayTasks);
      const currentDayHoursWithTasks = this.grabTaskHoursFromCurrentDayObject(sortedCurrentDayTasks);
      const formattedTaskDivs = currentDayHoursWithTasks.map(taskHour => {
        const currentTasksDiv = [];
        const tasksForCurrentHour = this.grabTasksForHour(taskHour, sortedCurrentDayTasks);
        tasksForCurrentHour.forEach(taskObject => {
          const { taskId, taskDuration, taskStartTime, taskName } = taskObject;
          const taskClasses = `task task_Color_${taskId} task_Duration_${taskDuration}`;
          if (taskName === "Farmer's Market" && taskStartTime === '0000') {
            currentTasksDiv.push(<div className={taskClasses}>{taskName}</div>);
          }
          else if (taskStartTime > '0400') {
            currentTasksDiv.push(<div className={`${taskClasses} task_Start_${taskStartTime}`}>{taskName}</div>);
          }
        });

        const currentHourDiv = 
          <div className='dayStructured_hour' key={taskHour}>
            <span className='dayStructured_hour_marker'><span className='dayStructured_hour_marker_text'>{taskHour}</span> <hr></hr></span>
            {currentTasksDiv}
          </div>
        return currentHourDiv;
      });

      return formattedTaskDivs;
    }
    
    // let's put a loading notification here.
  }


  render(){
    const formattedDate = this.formatCurrentDate(this.props.currentDate);
    return(
      <>
        <div className='dayStructured'>
          <h3>Schedule for {formattedDate}</h3>
          <Notifier />
          <button 
            onClick={e => {
              e.preventDefault();
            }}>
              Please notify me!
          </button>
          {this.renderTasks()}
        </div>
        
      </>
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