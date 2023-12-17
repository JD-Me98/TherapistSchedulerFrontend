import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import './profile.css'

export default function Profile() {
  const { userId } = useParams();

  const id=localStorage.getItem('therapistId')

  const [description,setDescription]=useState('')
  const [therapist, setTherapist]=useState('')
  const [therapy, setTherapy]=useState('')
  const [hasDescription, setHasDescription]=useState(0)

  const navigate=useNavigate();


  useEffect(()=>{
    loadTherapist();
  },[]);

  const loadTherapist=async()=>{
    const result=await axios.get(`http://localhost:8080/therapist/${userId}/description`)
    if(result.status===200 && result.data){
      setDescription(result.data)
      setTherapist(result.data.therapist)
      setTherapy(result.data.therapy)
      setHasDescription(1)
      console.log(result.data)
    }
  }
  const addProfile=()=>{
    navigate(`/therapist/profile/${id}/add`)
  }
  const goToEdit=(e)=>{
    navigate(`/therapist/${userId}/description`)
  }
  return (
    <div>
        { hasDescription === 1 ? (
        <div className='profile-card'>
          <div>
          <h1>{description.firstName + " " + description.lastName}</h1>
          </div>
          <div >
            <img src={`data:image/jpg;base64,${description.imageData}`} 
            className='profilePic' alt=''/>
          </div>
          <div className='description'>
            <div className='d-header'>description</div>
            <div><p>{description.description}</p><br/></div>            
            <div>Address:{description.address}</div><br/>
            <div>email:{therapist.email}</div><br/>
            <div>Pricing: <h3>frw {description.pricing}</h3></div><br/>
            <div>Specialty: {therapy.specialty}</div>
            
          </div><br/>
          <div><button className='login-button' onClick={(e)=>goToEdit(description.id)}>Edit Profile</button></div>
        </div>
        ) : (
        <div className='add-profile'>
            <button onClick={addProfile}>Add profile</button>
        </div>
        )
        }
        
    </div>
  )
}
