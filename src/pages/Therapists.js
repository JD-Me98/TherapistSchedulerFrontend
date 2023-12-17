import React, { useEffect, useState } from 'react'
import Therapist from '../components/Therapist/Therapist'
import './therapists.css'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'

export default function Therapists() {
  const [therapists,setTherapist]=useState([])

  useEffect(()=>{
    loadTherapists()
  },[]);

  const loadTherapists=async()=>{
    const result=await axios.get("http://localhost:8080/therapist/description")
    setTherapist(result.data)
    console.log(result.data)
  }
  return (
    <div>
        <Navbar/>
        <h1>Therapists</h1>
          <div className='therapists-box'>
            {
              
              therapists.map((therapist) =>(
                <Therapist
                  imgsrc={`data:image/jpg;base64,${therapist.imageData}`}
                  name={therapist.firstName + " " + therapist.lastName}
                  specialty={therapist.therapy.specialty}
                  pricing={therapist.pricing}
              />
              ))


              
            }
        </div>
    </div>
  )
}
