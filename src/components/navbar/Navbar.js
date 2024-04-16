import "./navbar.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SignOut } from "../../account/login/SignOut";

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state && location.state.message
  const currentUser =   localStorage.getItem('userId')

  const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")

  return (
    // <div className="navbar">
      <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top'>
        <div className='container-fluid'>
      {/* <div className="navContainer"> */}
      <Link to={"/"} className='navbar-brand'>
                    <span className='hotel-color'> Homestay Booking </span>
                </Link>
                <div className='collapse navbar-collapse' >
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-srcoll'>
                {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className='nav-item'>
                                <NavLink to={"/admin"} className='nav-link' aria-current='page'>Admin</NavLink>
                            </li>
                        )}
                        {isLoggedIn && userRole === "ROLE_MANAGER" && (
                            <li className='nav-item'>
                                <NavLink to={"/manager"} className='nav-link' aria-current='page'>Manager</NavLink>
                            </li>
                        )}
                </ul>

                </div>
                
        <div className="navItems">
          { !isLoggedIn ? (
            <>
            <Link to ={'/register-manager'} className='navbar-brand'>
            <span className='hotel-color'>Become a host</span>
            </Link>
            <button className="navButton" onClick={() => navigate('/signup')}>Register</button>
            <button className="navButton"onClick={() => navigate('/signin')}>Login</button>
            </>
          ) : (
            <>
              <Link to={'/profile'} className='navbar-brand'>
              <span>{currentUser}</span>
              </Link>
              <SignOut/>
            </>
          )

          }
          
          </div>
        </div>
      {/* </div> */}
      </nav>
    // </div>
  )
}


export default Navbar;