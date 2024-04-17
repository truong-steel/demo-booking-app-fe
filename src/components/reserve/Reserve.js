import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const getHeader = () => {
  const token = localStorage.getItem('token')
  return {
      Authorization: `Bearer ${token}`,
      'Content-Type' : 'application/json'
  }
}

export const getHearder2 = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
}

const Reverse = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bookings/room/${id}/bookings`);
      setBookings(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleBookRoom = async () => {
    try {
      const data = {
      
        checkInDate: checkInDate,
        checkOutDate: checkOutDate
      };
      
      const response = await axios.post(`http://localhost:8080/bookings/room/${id}/booking`,
        
        data, {headers : getHeader()} 
      );
      console.log(data)
      console.log('Booking created successfully:', response.data);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const isBookedDay = (date) => {
    return bookings.some(booking =>
      new Date(booking.checkInDate) <= date && date <= new Date(booking.checkOutDate)
    );
  };

  return (
    <div>
      <DatePicker
        selected={checkInDate}
        onChange={(date) => setCheckInDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        filterDate={!isBookedDay}
        placeholderText="Select check-in date"
      />
      <DatePicker
        selected={checkOutDate}
        onChange={(date) => setCheckOutDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={checkInDate || new Date()}
        filterDate={!isBookedDay}
        placeholderText="Select check-out date"
      />
      <button onClick={handleBookRoom}>Book Room</button>
    </div>
  );
};

export default Reverse;
