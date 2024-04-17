import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './bookingForm.css'
import Modal from 'react-modal';

export const getHeader = () => {
    const token = localStorage.getItem('token')
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type' : 'application/json'
    }
}

function ReserveS() {
  const { id } = useParams();
  const [bookedDates, setBookedDates] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [confirmCode, setConfirmCode] = useState(null);

  

  // Fetch booked dates based on roomId
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookings/room/${id}/bookings`);
        const data = response.data;
        // console.log(data)
        const dates = data.map(booking => new Date(booking.checkInDate));
        setBookedDates(dates);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      }
    };

    if (id) {
      fetchBookedDates();
    }
  }, [id]);

  // useEffect(() => {
  //   console.log(bookedDates);
  // }, [bookedDates]);
  

  // Function to handle check-in date change
  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    // Auto set checkOutDate to the next day
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckOutDate(nextDay);
  };

  // Function to handle check-out date change
  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
      
        checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString()
      };
      
      const res = await axios.post(`http://localhost:8080/bookings/room/${id}/booking`,
        
        data, {headers : getHeader()} 
      );
      console.log(res.data)
      setConfirmCode(res.data);
    // Nếu thành công, hiển thị modal thành công và lấy thông tin của booking
    setModalContent('Booking created successfully!');
    setModalIsOpen(true);
  } catch (error) {
    // Nếu có lỗi, hiển thị modal lỗi
    setModalContent('Error creating booking: ' + error.message);
    setModalIsOpen(true);
  }
};

  return (
    <div className="form-container">
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Booking Form for Room {id}</h2>
      <div className="date-picker-wrapper">
        <label>Check-in Date:</label>
        <DatePicker
          selected={checkInDate}
          onChange={handleCheckInDateChange}
          minDate={new Date()}
          excludeDates={bookedDates}
        />
      </div>
      <div className="date-picker-wrapper">
        <label>Check-out Date:</label>
        <DatePicker
          selected={checkOutDate}
          onChange={handleCheckOutDateChange}
          minDate={checkInDate}
          excludeDates={bookedDates}
        />
      </div>
      <button type="submit">Book Room</button>
    </form>

    <Modal
    
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Booking Modal"
>
  <div className="form-container">
  <h2>Booking Status</h2>
  <p>{modalContent}</p>
  
  
  {bookingDetails && (
    <div>
      <h3>Booking Details</h3>
      <p>Check-in Date: {bookingDetails.checkInDate}</p>
      <p>Check-out Date: {bookingDetails.checkOutDate}</p>
      
    </div>
  )}

  <button type="submit" onClick={() => setModalIsOpen(false)}>Close</button>
  </div>
</Modal>

    </div>
  );
}
export default ReserveS;
