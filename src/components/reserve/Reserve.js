import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Reverse() {
  const { id } = useParams();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  // Simulate fetching booked dates for the room from server
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bookings/room/${id}/bookings`);
        const data = await response.json();
        const dates = data.map(booking => new Date(booking.checkinDate));
        setBookedDates(dates);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      }
    };

    fetchBookedDates();
  }, [id]);

  const handleDateChange = (date, type) => {
    if (type === 'checkIn') {
      setCheckInDate(date);
    } else {
      setCheckOutDate(date);
    }
  };

  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => {
      return date.getDate() === bookedDate.getDate() &&
             date.getMonth() === bookedDate.getMonth() &&
             date.getFullYear() === bookedDate.getFullYear();
    });
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <p>Room ID: {id}</p>
      <div>
        <h3>Check-in Date</h3>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => handleDateChange(date, 'checkIn')}
          filterDate={(date) => !isDateBooked(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <h3>Check-out Date</h3>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => handleDateChange(date, 'checkOut')}
          filterDate={(date) => !isDateBooked(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      {/* Other form fields */}
      <button>Book Now</button>
    </div>
  );
}

export default Reverse;
