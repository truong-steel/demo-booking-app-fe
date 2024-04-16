import React, { useState } from 'react'
import { bookRoom } from '../../api/Api'
import { Form, Input , DatePicker, Select, Button } from 'antd'
import Footer from '../footer/Footer'
import MailList from '../mailList/MailList'
import Navbar from '../navbar/Navbar'
import Header from '../header/Header'
import './reserve.css'

const Reserve = () => {
  const [formData , setFormData] = useState({
    checkInDate: '',
    checkOutDate:'',
    totalGuest:'',
    roomId:''
  })
    const handleChange = (e) => {
      const {name , value} = e.target
      setFormData({
        ...formData,
        [name] : value
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      bookRoom(formData);
    }

  return (
    <>
    <Navbar/>
    <Header type='list'/>
    <div className='container'>
      <h2> Booking Form </h2>
      <Form 
    onSubmit={handleSubmit}
    variant="filled"
  >
    <Form.Item
      label="Number of Guest"
      name="InputNumber"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input type="number"
          name="numGuests"
          value={formData.numGuests}
          onChange={handleChange} />
    </Form.Item>
    <Form.Item
      label="Select Room Type"
      name="Select"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Select name="roomType"
          value={formData.roomType}
          onChange={handleChange}>
      <option value="">Select Room Type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </Select> 
    </Form.Item>
    <Form.Item
      label="Check In Date"
      name="DatePicker"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <DatePicker
      value={formData.checkInDate}
      onChange={handleChange}
       />
    </Form.Item>
    <Form.Item
      label="Check Out Date"
      name="DatePicker"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <DatePicker 
      value={formData.checkOutDate}
      onChange={handleChange}
      />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Book Now
      </Button>
    </Form.Item>
    </Form>
    </div>
    <MailList/>
    <Footer/>
    </>
  )
}

export default Reserve