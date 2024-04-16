import React, { useContext, useState } from 'react'
import './SignIn.css'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../api/Api'
// import { AuthContext } from '../../context/AuthContext'
import Navbar from '../../components/navbar/Navbar'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { AuthContext } from '../auth/AuthProvider'

const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [login, setLogin] = useState({
        email: undefined,
        password: undefined
    })

    const {handleLogin} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.id]: e.target.value })
      };
    
    const handleClick = async (e) => {
        e.preventDefault();
        const success = await signIn(login)
        if (success) {
            const token = success.token
            console.log('sucess', success);
            handleLogin(token)
            navigate("/")
            window.location.reload()
        } else {
            setErrorMessage("Invalid username or password")
        }

        setTimeout(() => {
            setErrorMessage("")
        }, 4000)
      };
  return (
    <>
    <Navbar/>
    <Header type="list" />
    <div className='login'>
        <div className='loginContainer'>
            <h1 className='loginText'>Sign In</h1>
          <div className='formLogin'>
            <label>Email :</label>
            <input
            type='email'
            placeholder='email'
            id='email'
            onChange={handleChange}
            className='loginInput'
            />
          </div>
            
          <div className='formLogin'>
            <label>Password :</label>
            <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="loginInput"
            />
          </div>
            
             <button onClick={handleClick} className="lButton">
          Login
        </button>
        <p>---------------------------------------------------</p>
        <div className="social-buttons">
        <button className="btn-google" onClick={() => handleLogin('Google')}>
          Continue with Google
        </button>
        
        <button className="btn-apple" onClick={() => handleLogin('Apple')}>
          Continue with Apple
        </button>
        
        <button className="btn-facebook" onClick={() => handleLogin('Facebook')}>
          Continue with Facebook
        </button>
        
      </div>
      <br/>
        <p className='loginText'>Don't have account yet ? <Link to='/signup'> Sign Up </Link></p>
        </div>
    </div>
    <MailList/>
    <Footer/>
    </>
    

  )
}

export default SignIn