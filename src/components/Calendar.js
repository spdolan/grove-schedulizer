import React from 'react';
import { } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className='calendar'>
        <h2>Calendar</h2>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentDate: state.currentDate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);