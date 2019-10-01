import React from 'react';
import { } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.weekDaysShortName = this.weekDaysShortName.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    this.createBlankDays = this.createBlankDays.bind(this);
    this.createDays = this.createDays.bind(this);
    this.daysInCurrentMonth = this.daysInCurrentMonth.bind(this);
    this.createCalendarTable = this.createCalendarTable.bind(this);
    this.currentDay = this.currentDay.bind(this);
  }

  componentDidMount() {
    
  }

  daysInCurrentMonth(){
    return this.props.currentDate.daysInMonth()
  }

  firstDayOfMonth(){
    return this.props.currentDate.startOf('month').format('d');
    
  }

  currentDay(){
    return this.props.currentDate.format('D');
  }

  createBlankDays(){
    const blanksDaysCurrentMonth = [];
    const currentMonthFirstDay = this.firstDayOfMonth();
    for (let i = 0; i < currentMonthFirstDay; i++){
      blanksDaysCurrentMonth.push(<td className='calendar_day empty'>{''}</td>)
    }
    return blanksDaysCurrentMonth;
  }

  createDays(){
    const numberOfDaysCurrentMonth = this.daysInCurrentMonth();
    const daysForCurrentMonth = [];
    for (let day = 1; day <= numberOfDaysCurrentMonth; day++) {
      let currentDay = day == this.currentDay() ? 'today' : ''; 
      daysForCurrentMonth.push(<td className={`calendar_day ${currentDay}`} key={day}>{day}</td>)
    }
    return daysForCurrentMonth;
  }

  createCalendarTable(){
    const blanks = this.createBlankDays();
    const daysInMonth = this.createDays();
    const totalDays = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    totalDays.forEach((row, i) => {
      if (i === totalDays.length - 1) {
        rows.push(cells);
      }

      if(i % 7 !== 0){
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    })

    const monthDays = rows.map(row => {
      return <tr>{row}</tr>
    })

    return monthDays;
  }

  weekDaysShortName(){
    return moment.weekdaysShort().map(day => {
      return(
        <th className='calendar_header_weekday' key={day}>
          {day}
        </th>
      )
    });
  }

  render() {
    return (
      <div className='calendar'>
        <h2>{this.props.currentDate.format("MMMM YYYY")}</h2>
        <table>
          <thead>
            <tr className='calendar_header'>
              {this.weekDaysShortName()}
            </tr>
          </thead>
          <tbody>
            {this.createCalendarTable()}
          </tbody>
        </table>
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