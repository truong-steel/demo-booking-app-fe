import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { addNewRoom } from '../../api/Api';
import { Button, Form, Input } from 'antd';
import './AddRoom.css'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        image: null,
        roomType: "",
        roomPrice: ""
    })

    const navigate = useNavigate()

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }

        setNewRoom({ ...newRoom, [name]: value })
    }

    const hanleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({ ...newRoom, image: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addNewRoom(newRoom.image, newRoom.roomType, newRoom.roomPrice)
            if (success !== undefined) {
                setSuccessMessage("A new room was added")
                setNewRoom({ image: null, roomType: "", roomPrice: "" })
                setImagePreview("")
                setErrorMessage("")
                navigate('/manager')
            } else {
                setErrorMessage("Error adding room")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }

        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

  return (
    <>
      <Navbar/>
      <Header type='list'/>  
                    <div className='form-container'>
                        <h2>Add a New Room</h2>
                        {successMessage && (
                            <div>{successMessage}</div>
                        )}

                        {errorMessage && (
                            <div>{errorMessage}</div>
                        )}
                        <Form name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }} onSubmit={handleSubmit}>

                                <Form.Item 
                                label = 'Room Type' htmlFor='roomType' name ='room-type' rules={[
                                    {
                                      required: true,
                                      message: 'Please input room type!',
                                    },
                                  ]}>
                                    <Input className='form-control' required id='roomType' name='roomType'
                                    value={newRoom.roomType} onChange={handleRoomChange} type='text'/>
                                </Form.Item>

                                <Form.Item 
                                label = 'Room Price' htmlFor='roomPrice' name ='room-price' rules={[
                                    {
                                      required: true,
                                      message: 'Please input room price!',
                                    },
                                  ]}>
                                    <Input className='form-control' required id='roomPrice' name='roomPrice'
                                    value={newRoom.roomPrice} onChange={handleRoomChange} type='number'/>
                                </Form.Item>

                                <Form.Item 
                                label = 'Room Image' htmlFor='roomImage' name ='room-image' rules={[
                                    {
                                      required: true,
                                      message: 'Please input your username!',
                                    },
                                  ]}>
                                    <Input type="file" id='image' name='image' className='form-control'
                                    onChange={hanleImageChange}/>
                                    {imagePreview && (
                                    <img src={imagePreview} style={{ maxWidth: '400px', maxHeight: '400px' }} className='mb-3' alt="Room Image" />
                                )}
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                    }}
                                >
                                <Button type="primary" htmlType="submit">
                                     Submit
                                </Button>
                                <Button type='dashed' htmlType="submit" onClick={()=> navigate('/manage-room')}>
                                     Cancel
                                </Button>                       
                                </Form.Item>
                        </Form>
                    </div>
    </>
  )
}

export default AddRoom