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
    console.log(formattedDate);
    console.log(this.props.calendar[formattedDate]);
    const currentDayTasks = this.props.calendar[formattedDate];
    if(currentDayTasks.length > 0){
      const formattedTaskDivs = currentDayTasks.map(taskObject => {
        const taskClasses = `task_Color_${taskObject.id} task_Duration_${taskObject.taskDuration}`
      });  
    }
      
  }

  render(){
    return(
      <div className='dayStructured'>
        {this.renderHourLines()}
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