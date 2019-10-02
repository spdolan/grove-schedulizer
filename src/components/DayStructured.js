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
    return taskHours.filter(taskHour => {
      return taskHour % 100 === 0;
    });
  }

  hourOfTimeFormattedString(twentyFourHourTimeString){
    return twentyFourHourTimeString.substr(0,2);
  }

  grabTasksForHour(hourString, arrayOfTaskObjects){
    return arrayOfTaskObjects.filter(taskObject => {
      return hourOfTimeFormattedString(hourString) === hourOfTimeFormattedString(taskObject.taskStartTime);
    })
  }

  renderTasks(){
    const formattedDate = this.formatCurrentDate(this.props.currentDate);
    const currentDayTasks = this.props.calendar[formattedDate];
    if(currentDayTasks.length > 0){
      const sortedCurrentDayTasks = sortCurrentDayTasks(currentDayTasks);
      const currentDayHoursWithTasks = this.grabTaskHoursFromCurrentDayObject(this.sortCurrentDayTasks);
      const formattedTaskDivs = currentDayHoursWithTasks.map(taskHour => {
        let currentHourDiv = <div className='dayStructured_hour' key={taskStartTime}><span className='dayStructured_hour_text'>{taskStartTime}</span> <hr></hr></div>
        const tasksForCurrentHour = this.grabTasksForHour(taskHour, sortedCurrentDayTasks);
        tasksForCurrentHour.forEach(taskObject => {
          const { taskId, taskDuration, taskStartTime, taskName } = taskObject;
          const taskClasses = `task task_Color_${taskId} task_Duration_${taskDuration}`;
          if (taskName === "Farmer's Market" && taskStartTime === '0000') {
            currentHourDiv.push(<div className={taskClasses} key={`task-${i}`}>{taskName}</div>);
          }
          else if (taskStartTime > '0600') {
            currentHourDiv.push(<div className={`${taskClasses} task_Start_${taskStartTime}`} key={`task-${i}`}>{taskName}</div>);
          }
        });

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