import React from 'react';
import { } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class DayStructured extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // use an array to create our hour lines - both midnights implied
      hours: [...Array(23).keys()].map(x => x+1)
    };
    this.renderHourLines = this.renderHourLines.bind(this);
    this.renderTasks = this.renderTasks.bind(this); 
    this.formatCurrentDate = this.formatCurrentDate.bind(this); 
  }

  componentDidMount(){    
  }

  renderHourLines(){
    return this.state.hours.map(hour => {
      return(
        // the developer is not advocating for using values as keys here
        <div className='dayStructured_hour' key={hour}>
          <span className='dayStructured_hour_text'>{`${hour}:00`}</span> <hr></hr>
        </div>
      )
    });
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

  renderTasks(){
    const formattedDate = this.formatCurrentDate(this.props.currentDate);
    console.log(this.props.calendar[formattedDate]);
    const currentDayTasks = this.props.calendar[formattedDate];
    if(currentDayTasks.length > 0){
      const sortedCurrentDayTasks = currentDayTasks.sort(function (a, b) {
        return a.taskStartTime - b.taskStartTime;
      })
      const formattedTaskDivs = sortedCurrentDayTasks.map((taskObject, i) => {
        const {taskId, taskDuration, taskStartTime, taskName} = taskObject;
        const taskClasses = `task task_Color_${taskId} task_Duration_${taskDuration}`;
        if (taskStartTime % 100 === 0 && taskName === 'Stretch and get water' || taskStartTime % 100 === 0 && taskName === "Farmer's Market"){
          return (
            <div className='dayStructured_hour' key={taskStartTime}>
              <span className='dayStructured_hour_text'>{taskStartTime}</span> <hr></hr>
              <div className={taskClasses} key={`task-${i}`}>{taskName}</div>
            </div>
          );
        } 
               
        else if (taskStartTime > '0600') {
          return (<div className={`${taskClasses} task_Start_${taskStartTime}`} key={`task-${i}`}>{taskName}</div>);
        }
      });
      
      return formattedTaskDivs;
    }
      
  }

  render(){
    const formattedDate = this.formatCurrentDate(this.props.currentDate);
    return(
      <>
        <div className='dayStructured'>
          <h3>Schedule for {formattedDate}</h3>
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