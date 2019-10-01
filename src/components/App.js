import React from 'react';
import { getTasks, updateCalendarFromTasksCron } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DayStructured from './DayStructured';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTasks();
  }

  componentDidUpdate(){
    this.props.updateCalendarFromTasksCron(this.props.tasks, this.props.calendar);
  }

  render() {
    return (
      <div className='main'>
        <DayStructured />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    calendar: state.calendar,
    tasks: state.tasks
    // currentDate: state.currentDate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTasks, updateCalendarFromTasksCron }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);