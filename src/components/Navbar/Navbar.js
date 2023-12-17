import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../userContext';
import ProfilePic from '../../images/profile.png'

export default function Navbar() {
  const {userId} =  useContext(UserContext);
  console.log('mi id is ' + userId);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState('');

  useEffect(()=> {

  const myuser =localStorage.getItem("therapistId")
  const getTherapist = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/therapist/${myuser}`);
      if (result.status === 200) {
        setIsLoggedIn(1);
        const res=result.data.username;
        setUser(res)
      } else {
        setIsLoggedIn(0);
      }
    } catch (error) {
      setIsLoggedIn(0); // Handle error or set default value for isLoggedIn
    }
  };
  getTherapist();
  
  },[]);

  

  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-list">
          <li><Link to="/" className="navbar-link">HOME</Link></li>
          <li><Link to="/appointment" className="navbar-link">APPOINTMENT</Link></li>
          <li><Link to="/therapists" className="navbar-link">THERAPISTS</Link></li>
          <li><Link to="/therapyCategory" className="navbar-link">THERAPY CATEGORY</Link></li>
          <li><Link to="/appointmentTracker" className="navbar-link">APPOINTMENT TRACKER</Link></li>
        </ul>
        <div className="navbar-buttons">
          {isLoggedIn === 0 ? (
            <>
              <Link to="/login" className="login-button">Login</Link>
              <Link to="/signup" className="signup-button">Signup</Link>
            </>
          ) : isLoggedIn === 1 ?(            
            <Link to={`/therapist/${userId}`} className='profile-button'><img src={ProfilePic} className='profile-pic'/> {user}</Link>
          ) : <></> }
        </div>
      </nav>
    </div>
  );
}