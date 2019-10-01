import React from 'react';
import { } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class DayStructured extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: [...Array(23).keys()].map(x => x+1)
    };
    this.renderHourLines = this.renderHourLines.bind(this);  
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
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DayStructured);