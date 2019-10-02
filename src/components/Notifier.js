import React from 'react';
import { requestNotificationPermission } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';

class Notifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDayTasks: [],
      seconds: 0
    }
    this.formatCurrentDate = this.formatCurrentDate.bind(this);
    this.sortCurrentDayTasks = this.sortCurrentDayTasks.bind(this);
    this.clickedNotifyButton = this.clickedNotifyButton.bind(this);
    this.tick = this.tick.bind(this);
    this.checkTaskTimes = this.checkTaskTimes.bind(this);
    this.checkForNotifications = this.checkForNotifications.bind(this);
  }

  componentDidMount(){
    this.interval = setInterval(() => this.tick(), 10000);
    const formattedDate = this.formatCurrentDate(this.props.currentDate);
    const currentDayTasks = this.props.calendar[formattedDate];
    this.setState({ currentDayTasks });
  }

  componentDidUpdate(){
    
    // console.log('Checking stuff here!');
    // console.log('Notifications are: ', this.props.acceptsNotifications);
    // this.checkForNotifications();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  checkTaskTimes(taskObject){
    const currentTime = moment();
    console.log(currentTime);
    
    const taskTime = moment(taskObject.taskDateTime);
    console.log(taskTime);
    console.log(currentTime.diff(taskTime, 'minutes'))
  }

  checkForNotifications(){
    // return this.state.currentDayTasks.filter(taskObject => {
    //   return Math.abs(taskObject.taskStartTime - currentTime) <= 15; 
    // })
    this.state.currentDayTasks.forEach(taskObject => {
      this.checkTaskTimes(taskObject);
    })
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

  sortCurrentDayTasks(arrayOfTaskObjects) {
    return arrayOfTaskObjects.sort(function (a, b) {
      return a.taskStartTime - b.taskStartTime;
    })
  }

  clickedNotifyButton(){
    if (this.props.acceptsNotifications === null) {
      this.props.requestNotificationPermission();
    }
  }

  render(){
    const formattedDate = this.formatCurrentDate(this.props.currentDate);
    return(
      <div className="notifier">
        <h3>Schedule for {formattedDate} </h3>
        <button
          onClick={e => {
            e.preventDefault();
            this.clickedNotifyButton();
          }}>
          Please notify me!
        </button>
        <h5>Seconds: {this.state.seconds} </h5>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentDate: state.currentDate,
    calendar: state.calendar,
    acceptsNotifications: state.acceptsNotifications
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestNotificationPermission }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);