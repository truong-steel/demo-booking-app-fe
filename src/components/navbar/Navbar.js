import "./navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SignOut from "../../account/login/SignOut";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const currentUser =   localStorage.getItem('userId')

  const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")

  return (
    <div className="navbar">
      {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <div className='nav-item'>
                                <NavLink to={"/admin"} className='nav-link' aria-current='page'>Admin</NavLink>
                            </div>
                        )}
                        {isLoggedIn && userRole === "ROLE_MANAGER" && (
                            <div className='nav-item'>
                                <NavLink to={"/manager"} className='nav-link' aria-current='page'>Manager</NavLink>
                            </div>
                        )}
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Homestay Booking</span>
        </Link>
        {user ? user.username : (
          <div className="navItems">
            <NavLink className='nav-link' to={"/manager-register"}>Become A Host</NavLink>
            <>
            {isLoggedIn ? (
              <>
                <NavLink to={'/profile'} className='nav-link' aria-current='page'>{currentUser}</NavLink>
                <SignOut/>
              </>
            ) : (
              <>
                <button className="navButton"onClick={() => navigate('/signin')}>Login</button>
                <button className="navButton" onClick={() => navigate('/signup') }>Register</button>
              </>
            )}
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;