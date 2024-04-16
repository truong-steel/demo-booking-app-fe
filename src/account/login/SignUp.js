import React, { useState } from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom';
import { signUp } from '../../api/Api';
import Navbar from '../../components/navbar/Navbar';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

const SignUp = () => {
    const [register , setRegister] = useState({
        email:"",
        password:"",
        fullName:"",
        phone:"",
        username:""
    })
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const handleInPutChange = (e) => {
        setRegister({ ...register, [e.target.id]: e.target.value })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const result = await signUp(register)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegister({ email: '', password: '', fullName:'', phone: '',  username:'',})
            setSuccess(true);
        } catch (error) {
            setSuccessMessage("")
            setErrorMessage(`Error ${error.message}`)
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }
  return (
    
        <>
    { success ? (
        <section>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {successMessage && <p className='alert alert-success'>{successMessage}</p>}
            <div className='text-noti'>
            <h1>Register Success!</h1>
            <p>
                <Link to={"/signin"}>Sign In</Link>
            </p>
            </div>
            
        </section>
    ) : ( 
        <section>
            <Navbar/>
            <Header type="list" />
        <div className='register'>
            <div className='registerContainer'>
                <h1 className='registerText'>Sign Up</h1>
            <div className='formLogin'>
                <label>Email :</label>
                <input
                type='email'
                placeholder='email'
                id='email'
                onChange={handleInPutChange}
                className='loginInput'
                required value={register.email}
                />
                <label>Password :</label>
                <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleInPutChange}
              className="loginInput"
              required value={register.password}
                />
                <label>Customer Name :</label>
                <input
                type='text'
                placeholder='full name'
                id='fullName'
                onChange={handleInPutChange}
                className='loginInput'
                required value={register.fullName}
                />
                <label>Phone Number:</label>
                <input
                type='tel'
                placeholder='phone number'
                id='phone'
                onChange={handleInPutChange}
                className='loginInput'
                required value={register.phone}
                />
                <label>Username :</label>
                <input
                type='text'
                placeholder='username'
                id='username'
                onChange={handleInPutChange}
                className='loginInput'
                required value={register.username}
                />
                </div>
                <br/>
                
                 <button onClick={handleSignUp} type='submit' className="lButton">
              Sign Up
            </button>
            <br/>
            
                <p className='regText'>Already have an account ? <Link to={"/signin"}>Sign In</Link></p>
                
            </div>
        </div>
        <MailList/>
        <Footer/>
            </section>
    )
    }
    </>
    
  )
}

export default SignUp