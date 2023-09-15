
import React, { useContext } from 'react'
import logo from '../images/Peep1.png';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
const NavBar = ({ login }) => {
  const navigate = useNavigate();

  const { setModalOpen } = useContext(LoginContext)

  const loginStatus = () => {  // login kora thaklei createpost r profile dekhabe navbar a 

    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>

          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createpost">
            <li>Create Post</li>
          </Link>
          <Link to="/followingpost">
            <li>My Following</li>
          </Link>
          <Link to={""}>
            <button className='primaryBtn' onClick={() => setModalOpen(true)}>Logout</button>
          </Link>
        </>
      ]
    }
    else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>
      ]
    }
  }

  const loginStatusMobile = () => { // mobile a navbar er jonno

    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/">
            <li>
              <span className="material-symbols-outlined">
                home
              </span>
            </li>
          </Link>

          <Link to="/profile">
            <li>
              <span className="material-symbols-outlined">
                account_circle
              </span></li>
          </Link>

          <Link to="/createpost">
            <li>
              <span className="material-symbols-outlined">
                add_circle
              </span>
            </li>
          </Link>

          <Link to="/followingpost">
            <li>
              <span className="material-symbols-outlined">
                explore
              </span>
            </li>
          </Link>
          <Link to={""}>
            <li className='primaryBtn' onClick={() => setModalOpen(true)}>
              <span className="material-symbols-outlined">
                logout
              </span>
            </li>
          </Link>
        </>
      ]
    }
    else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>
      ]
    }
  }

  return (
    <div className='navbar'>
      <img id='insta-logo' src={logo} alt="" onClick={() => { navigate('/') }} />
      <ul className='nav-menu'>
        {loginStatus()}
      </ul>
      <ul className='nav-mobile'>
        {loginStatusMobile()}
      </ul>
    </div>
  )
}

export default NavBar