import React from 'react'
import Navbar from '../components/Navbar/Navbar'

export default function AdminLogin() {
  return (
    <div>
        <Navbar/>
        <div className='admin-login'>
            <form className='form-login'>
                <label >login</label><br/>
                <input type='text' name='username' placeholder='username'/><br/>
                <label >password</label><br/>
                <input type='password' name='password' placeholder='password'/><br/>
                <button> Login </button>
                
            </form>
        </div>
    </div>
  )
}
