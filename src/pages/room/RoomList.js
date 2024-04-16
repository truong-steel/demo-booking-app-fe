import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../../api/Api'
import { Button, Table , Tag , Space } from 'antd'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom'

const RoomList = () => {
    const [rooms , setRooms] = useState([])
    const [loading , setLoading] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const navigate = useNavigate()

    const fetchRooms = async () => {
        try {
              const res = await getAllRooms()
              setRooms(res.content)
          } catch (error) {
              setErrorMessage(error.message)
          }  
      }
      
      useEffect(() => {
          if (rooms.length < 1) {
            fetchRooms();
          }
        }, [rooms.length]);
    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Image',
            key: 'img',
            dataIndex: 'img',
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
              </Space>
            ),
          },
        ];
        const data = rooms.map((room) => ({
            key : '1',
            id : room.id,
            type : room.roomType,
            price : room.roomPrice,
            img : room.image
        }) )
        // const data = [
        //   {
        //     key: '1',
        //     name: 'John Brown',
        //     age: 32,
        //     address: 'New York No. 1 Lake Park',
        //     tags: ['nice', 'developer'],
        //   },
        //   {
        //     key: '2',
        //     name: 'Jim Green',
        //     age: 42,
        //     address: 'London No. 1 Lake Park',
        //     tags: ['loser'],
        //   },
        //   {
        //     key: '3',
        //     name: 'Joe Black',
        //     age: 32,
        //     address: 'Sydney No. 1 Lake Park',
        //     tags: ['cool', 'teacher'],
        //   },
        // ];

  return (
    <>
    <Navbar/>
    <Header type='list'/>
    <br/>
    <Button type='primary' onClick={() => navigate('/add-room')}>Add Room</Button>
    <br/>
    <Table
    columns={columns}
    dataSource={data}
    scroll={{
      x: 1300,
    }}
  />
    </>
    
  )
}

export default RoomList