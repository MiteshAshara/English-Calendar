import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, addDays, isSameDay, isSameMonth, format } from 'date-fns';
import './GujaratiCalendar.css';

const GujaratiCalendar = ({ festivals }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());


  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };


  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today); 
    setSelectedDate(today); 
  };


  const selectDay = (day) => {
    setSelectedDate(day);
  };

  const getFestivalForDate = (date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return festivals.find(festival => festival.date === dateString);
  };

  const isToday = (day) => {
    return isSameDay(day, new Date());
  };


  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const days = [];

    let day = startDate;
    while (day <= endDate) {
      const isFest = getFestivalForDate(day); 
      const isCurrentDay = isToday(day);
      const isCurrentMonth = isSameMonth(day, monthStart);

      let backgroundStyle = '';
      let dayClass = '';

     
      if (isFest) {
        backgroundStyle = 'lightgreen'; 
      }

      if (isCurrentDay) {
        backgroundStyle = isFest ? 'linear-gradient(155deg, gold, lightgreen)' : 'lightgreen'; 
      } else {
        backgroundStyle = isFest ? 'lightgreen' : 'white';
      }

      if (isCurrentDay) {
        dayClass = 'fw-bold'; 
      }

      days.push(
        <div
          key={day.toString()}
          className={`col-md-2 col-3 day ${isSameDay(day, selectedDate) ? 'selected' : ''} ${isCurrentDay ? 'today' : ''} ${isFest ? 'festival' : ''} ${dayClass}`}
          onClick={() => selectDay(day)} // Correctly passing the `day` value
          style={{
            background: backgroundStyle,
            color: isCurrentMonth ? 'black' : 'gray',
            opacity: isCurrentMonth ? 1 : 0.4, 
          }}
        >
          {format(day, 'd')}
          
          {isFest && isCurrentMonth && ( 
            <div className="festival-info" style={{
              textAlign: 'center',
              marginTop: '5px',
              width: 'auto',
              marginTop: '1px',
              padding: '5px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}>
              <span className="festival-name" style={{
                fontWeight: 'bold', 
                fontSize: '14px', 
                display: 'block', 
                marginBottom: '5px'
              }}>
                {isFest.name}
              </span>

              {isFest.image && (
                <div 
                  className="festival-image-container" 
                  style={{
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '5px', 
                  }}
                >
                  <img 
                    src={isFest.image} 
                    alt={isFest.name} 
                    className="festival-image" 
                    style={{
                      width: '100px',  
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px', 
                      marginTop: '-10px',
                    }} 
                  />
                </div>
              )}
            </div>
          )}
        </div>
      );
      
      day = addDays(day, 1);
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header d-flex justify-content-between align-items-center">
        <button onClick={goToPreviousMonth} className="btn btn-dark">Previous</button>
        <div className="text-center flex-grow-1">
          <span className="fw-bold h3">
            {format(currentMonth, 'MMMM yyyy')} 
          </span>
        </div>
        <button onClick={goToNextMonth} className="btn btn-dark">Next</button>&nbsp;
        <button onClick={goToToday} className="btn btn-dark">Today</button> 
      </div>
      <div className="calendar-weekdays row">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
          <div className="col calendar-weekday" key={day}>{day}</div>
        ))}
      </div>
      <div className="calendar-body">
        <div className="row">
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default GujaratiCalendar;
