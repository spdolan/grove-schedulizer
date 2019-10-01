import React from 'react';
import { setCurrentDateFromCalendar } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    // this plethora of bindings is why Dan Abramov created Hooks/Context API,
    // which the developer will endeavor to improve themself by learning.
    this.weekDaysShortName = this.weekDaysShortName.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    this.createBlankDays = this.createBlankDays.bind(this);
    this.createDays = this.createDays.bind(this);
    this.daysInCurrentMonth = this.daysInCurrentMonth.bind(this);
    this.createCalendarTable = this.createCalendarTable.bind(this);
    this.getCurrentDateDayNumber = this.getCurrentDateDayNumber.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
  }

  daysInCurrentMonth(){
    return this.props.currentDate.daysInMonth()
  }

  firstDayOfMonth(){
    return this.props.currentDate.startOf('month').format('d');
  }

  getCurrentDateDayNumber(){
    // our selected non-present date does not have specific time, 
    // so we check for internal date property
    const currentDate = this.props.currentDate._a ? 
      this.props.currentDate._a[2] :
      this.props.currentDate.format('D');
    return currentDate;
  }

  onDayClick(day){
    // we are prefixing a zero for dates that are less than 10
    const dayNumeric = day < 10 ? `0${day}` : day;
    const monthNumeric = (this.props.currentDate.get('month')+1);
    const yearNumeric = this.props.currentDate.get('year');
    // interpolating our new date
    const updatedDayString = `${monthNumeric}/${dayNumeric}/${yearNumeric}`;
    this.props.setCurrentDateFromCalendar(updatedDayString);
  }

  // adding in our first blank days, if a month does not begin on a Sunday
  createBlankDays(){
    const blanksDaysCurrentMonth = [];
    const currentMonthFirstDay = this.firstDayOfMonth();
    for (let i = 0; i < currentMonthFirstDay; i++){
      blanksDaysCurrentMonth.push(<td className='calendar_day empty' key={`e${i}`}>{''}</td>)
    }
    return blanksDaysCurrentMonth;
  }

  createDays(){
    // grab total number of days within our month
    const numberOfDaysCurrentMonth = this.daysInCurrentMonth();
    const currentDate = this.getCurrentDateDayNumber();
    const daysForCurrentMonth = [];
    for (let day = 1; day <= numberOfDaysCurrentMonth; day++) {
      let isToday = day === +currentDate ? 'today' : ''; 
      daysForCurrentMonth.push(
        <td 
          className={`calendar_day ${isToday}`} 
          key={`d${day}`}
          onClick={e => {
            this.onDayClick(day);
          }}
        >
          <span>{day}</span>
        </td>)
    }
    return daysForCurrentMonth;
  }

  createCalendarTable(){
    const blanks = this.createBlankDays();
    const daysInMonth = this.createDays();
    // destructure our blanks and actual days within the month to create a table
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
    const monthDays = rows.map((row,i) => {
      return <tr key={`r${i}`}>{row}</tr>
    });
    return monthDays;
  }

  weekDaysShortName(){
    return moment.weekdaysShort().map(day => {
      return(
        <th className='calendar_header_weekday' key={`th${day}`}>
          {day}
        </th>
      )
    });
  }

  render() {
    return (
      <div className='calendar'>
        <h2 className='calendar_banner'>
          {this.props.currentDate.format("MMMM YYYY")}
        </h2>
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
  return bindActionCreators({ setCurrentDateFromCalendar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);