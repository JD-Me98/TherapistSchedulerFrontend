import React, { useState } from 'react'
import './Therapistsignup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Therapistlogin() {
    let navigate = useNavigate()
    const [therapist, setTherapist] = useState({
        username: "",
        password: "",
        email: "",
      });
      const [c_password, setC_password] = useState('')

    const{username,password,email}=therapist

    const onInputChange=(e)=>{
        setTherapist({...therapist,[e.target.name]:e.target.value})
    };
      
    const onSubmit=async(e)=>{
        e.preventDefault();
        if(c_password===therapist.password){
            const response = await axios.post("http://localhost:8080/therapist/sign-up",therapist)
            if(response.status === 200){
                navigate("/")
            }else{
                alert("failed to sign up!")
            }
        }else{
            alert("passwords do not match!")
        }
        
    }
  return (
    <div className="login-form-container">
        <div className='login-sidebar'>
            <h1>Register Now</h1>
            <h3>"Expand your reach and connect with clients globally. Join our platform to showcase your expertise and grow your practice!"</h3>
        </div>
        <form className="login-form" onSubmit={(e)=>onSubmit(e)}>
            <h2>Sign Up</h2>
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder='username'
                value={username}
                onChange={(e)=>onInputChange(e)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder='Email'
                value={email}
                onChange={(e)=>onInputChange(e)}
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
                onChange={(e)=>onInputChange(e)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
                type="password"
                id="password"
                name="c_password"
                placeholder='password'
                value={c_password}
                onChange={(e) => setC_password(e.target.value)}
            />
            </div>
            <br/>
            <button className="signupbutton" type="submit">Signup</button>
        </form>
    </div>
  )
}
