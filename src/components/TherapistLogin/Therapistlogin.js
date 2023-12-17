import React, { useState } from 'react'
import './Therapistlogin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import Navbar from '../Navbar/Navbar';

export default function Therapistlogin() {

  //const {toggleId} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/therapist/login/${username}/${password}`);
      
      if (response.status === 200) {
        const userId = response.data.id;
        console.log(response.data);
        const loginResponse = await axios.post(`http://localhost:8080/login/${userId}`);
        
        if (loginResponse.status === 200) {
          //setUserId(userId);
          localStorage.setItem('therapistId', JSON.stringify(userId));
          navigate(`/therapist/${userId}`);
        } else {
          console.error('Login failed');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };      
  return (
    <div>
    <Navbar/>
      <div className="login-form-container">
          
          <div className='login-sidebar'>
              <h1>Login Now</h1>
              <h3>"Welcome back, Access your account to manage appointments, connect with clients, and enhance your practice."</h3>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
              <h2>Login</h2>
              <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
              </div>
              <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              </div><br/>         
              <button type="submit" className="loginButton">Login</button>
          </form>
      </div>
    </div>
  )
}
