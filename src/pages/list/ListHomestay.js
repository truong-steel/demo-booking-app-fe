import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ListHomestay.css'
import { getAllHomestays } from '../../api/Api';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';

const ListHomestay = () => {
    const [homestays , setHomestays] = useState([])
    const [loading , setLoading] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
  
    const fetchHomestays = async () => {
      try {

            const res = await getAllHomestays()
            setHomestays(res.content)
        } catch (error) {
            setErrorMessage(error.message)
        }  
    }
    // fetchHomestays()
    
    useEffect(() => {
        if (homestays.length < 1) {
          fetchHomestays();
        }
      }, [homestays.length]);

      const data = homestays.map((homestay) => ({
        href: `/homestays/:id`,
        title: homestay.homestayName,
        avatar: homestay.homestayImg,
        content:
          homestay.description,
        description:
        homestay.address,
      }));
      const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );
      
  return (
    <div>
      <Navbar/>
      <Header type="list" />
        <h1 className='list_text'>List of Homestays</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
<List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    // footer={
    //   <div>
    //     <b>ant design</b> footer part
    //   </div>
    // }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://nhahangdungtien.com/upload_images/images/23/11/22/456306c1bfecbb3ecbc171034563_homestay-ba-vi-14.jpg"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
  </>
      )}
    </div>
  )
}

export default ListHomestay