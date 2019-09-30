import React from 'react';
import { getAndConvertTasks } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class DayStructured extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: [Array.from(23).keys()].map(i => i++)
    }
    this.renderHourLines = this.renderHourLines.bind(this);  
  }

  componentDidMount(){
    this.props.getAndConvertTasks();
  }

  renderHourLines(){
    return this.state.hours.map(hour => <hr className='dayStructured_hour'></hr>);
  }

  render(){
    return(
      <div className='dayStructured'>
        {this.renderHourLines()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getAndConvertTasks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DayStructured);