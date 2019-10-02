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
      interval: 0
    }
    this.formatCurrentDate = this.formatCurrentDate.bind(this);
    this.sortCurrentDayTasks = this.sortCurrentDayTasks.bind(this);
    this.clickedNotifyButton = this.clickedNotifyButton.bind(this);
    this.tick = this.tick.bind(this);
    this.checkTaskTimeToStart = this.checkTaskTimeToStart.bind(this);
    this.checkForNotifications = this.checkForNotifications.bind(this);
    this.createNotifications = this.createNotifications.bind(this);
    this.sendNotifications = this.sendNotifications.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }

  componentDidMount(){
    // our app will check every minute for new Notifications
    this.interval = setInterval(() => this.tick(), 60000);
    const formattedDate = this.formatCurrentDate(this.props.currentDate);
    const currentDayTasks = this.props.calendar[formattedDate];
    this.setState({ currentDayTasks });
  }

  componentDidUpdate(){
    if(this.props.acceptsNotifications){
      const currentNotifications = this.createNotifications();
      this.sendNotifications(currentNotifications);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState(prevState => ({
      interval: prevState.interval + 1
    }));
  }

  checkTaskTimeToStart(taskObject){
    // we are using Moment to determine our difference between current time and task times
    const currentTime = moment();
    const taskTime = moment(taskObject.taskDateTime);
    return currentTime.diff(taskTime, 'minutes');
  }

  checkForNotifications(){
    // we will notify folks if their task is beginning within 15 minutes
    return this.state.currentDayTasks.filter(taskObject => {
      return this.checkTaskTimeToStart(taskObject) === -15 || this.checkTaskTimeToStart(taskObject) === 0; 
    })
  }

  createNotifications(){
    const tasksToNotify = this.checkForNotifications();
    const createNotifications = tasksToNotify.map(taskObject => {
      return this.checkTaskTimeToStart(taskObject) === 0 ?
        `It's time for: ${taskObject.taskName}!` :
        `${taskObject.taskName} starts in less than 15 minutes!`;
    })

    return createNotifications;
  }

  sendNotifications = (notificationMessageArray) => {
    notificationMessageArray.forEach(notificationMessage => {
      this.sendNotification(notificationMessage);
    })
  }

  sendNotification = (notificationMessage) => {
    new Notification(notificationMessage);
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