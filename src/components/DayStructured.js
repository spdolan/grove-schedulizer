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

  renderTasks(){
    let formattedCurrentDate = '';
    if (this.props.currentDate._a){
      const formattedCurrentMonth = (this.props.currentDate._a[1] + 1) < 10 ?
        `0${(this.props.currentDate._a[1] + 1)}` :
        (this.props.currentDate._a[1] + 1);
      const formattedCurrentDay = (this.props.currentDate._a[2]) < 10 ?
        `0${(this.props.currentDate._a[2])}` :
        (this.props.currentDate._a[2]);
      formattedCurrentDate = `${formattedCurrentMonth}/${formattedCurrentDay}/${this.props.currentDate._a[0]}`
    } else {
      formattedCurrentDate = this.props.currentDate.format("MM/DD/YYYY");
    }
    
    console.log(formattedCurrentDate);
    console.log(this.props.calendar[formattedCurrentDate]);
    const currentDayTasks = this.props.calendar[formattedCurrentDate];
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