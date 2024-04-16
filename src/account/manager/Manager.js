import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Manager.css'
import ExistingRoom from '../../room/ExistingRoom'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import MailList from '../../components/mailList/MailList'

const Manager = () => {
  const [homestays , setHomestays] = useState([])

  return (
    <>
    <section>
      <Navbar/>
      <Header type='list'/>
        <br/>
        <h2 className='text'>Welcome to Manager Panel </h2>
        <hr/>
        <ExistingRoom/>
        </section>
    <MailList/>
    <Footer/>
    </>
    
  )
}

export default Manager