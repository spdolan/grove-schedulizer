import React from 'react';
import { requestNotificationPermission } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';

class Notifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDayTasks: []
    }
    this.formatCurrentDate = this.formatCurrentDate.bind(this);
    this.sortCurrentDayTasks = this.sortCurrentDayTasks.bind(this);
    this.clickedNotifyButton = this.clickedNotifyButton.bind(this);
  }

  componentDidMount(){
    
  }

  componentDidUpdate(prevProps){
    // format our date then grab tasks from our calendar object
    if (this.props.currentDate !== prevProps.currentDate) {
      const formattedDate = this.formatCurrentDate(this.props.currentDate);
      const currentDayTasks = this.props.calendar[formattedDate];
      this.setState({ currentDayTasks })
    }
  }

  // return a string formatted MM/DD/YYYY based on our currentDate store property
  formatCurrentDate(momentDayObject) {
    let formattedCurrentDate = '';
    if (momentDayObject._a) {
      // check if Moment's zero-based months are before October, and prepend a 0
      const formattedCurrentMonth = (momentDayObject._a[1] + 1) < 10 ?
        `0${(momentDayObject._a[1] + 1)}` :
        (momentDayObject._a[1] + 1);
      // check if current date is before the 10th, and prepend a 0
      const formattedCurrentDay = (momentDayObject._a[2]) < 10 ?
        `0${(momentDayObject._a[2])}` :
        (momentDayObject._a[2]);
      // interpolate our formatted Month/Day/Year
      formattedCurrentDate = `${formattedCurrentMonth}/${formattedCurrentDay}/${momentDayObject._a[0]}`
    } else {
      // no need to parse if the current day is a non-parsed MomentJS object
      formattedCurrentDate = momentDayObject.format("MM/DD/YYYY");
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
    return(
      <div className="notifier">
        <h5 className="notfier_header">
          Notifier here!
        </h5>
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