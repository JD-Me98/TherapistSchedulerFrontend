import React, { useEffect,useContext }from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './nav.css'
import axios from 'axios';


export default function Therapistnav() {
  const userId = localStorage.getItem('therapistId')
  
  const navigate=useNavigate();
  useEffect(() => {
    console.log('logout id is '+userId)
  },[]);

  const signOut=async()=>{
    const response=await axios.delete(`http://localhost:8080/logout/${userId}`)
    if(response.status===200){
      localStorage.removeItem('therapistId');
      navigate("/login");
    }else{
      console.log("cannot logout")
    }
  }

  return (
    <div>
        <nav className="th-navbar">
            <ul className="th-navbar-list">
                <li><Link to={`/therapist/${userId}`} className="th-navbar-link">PROFILE</Link></li>
                <li><Link to="/therapist/appointments" className="th-navbar-link">APPOINTMENTS</Link></li>
                <li><Link to={`/therapist/schedule/${userId}`} className="th-navbar-link">SCHEDULE</Link></li>              
            </ul>
            <div className="th-navbar-buttons">
                
                <button onClick={signOut} className='th-signout'>Logout</button>
            </div>
        </nav>
    </div>
  )
}
