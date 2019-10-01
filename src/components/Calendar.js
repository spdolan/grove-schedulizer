import React from 'react';
import { } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTasks();
    this.props.updateCalendarFromTasksCron();
  }

  render() {
    return (
      <div className='calendar'>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    calendar: state.calendar
    // currentDate: state.currentDate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);