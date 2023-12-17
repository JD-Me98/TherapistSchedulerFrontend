import React, {useState,useEffect} from 'react'
import TherapyCategory from '../components/Therapy/Therapy'
import './Therapy.css'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'

export default function Therapy_category() {
  const [therapies,setTherapy]=useState([])

  useEffect(()=>{
    loadTherapy()
  },[]);

  const loadTherapy=async()=>{
    const result=await axios.get("http://localhost:8080/therapy/categories")
    setTherapy(result.data)
    console.log(result.data)
  }
  return (
    <div>
      <Navbar/>
    <div className='therapy-container'>
        
        <h1>Therapy categories</h1>
        {
          therapies.map((therapy)=>(
          <TherapyCategory
            image={therapy.img_url}
            description={therapy.description}
            specialty={therapy.specialty}
          />
          ))
        }
    </div>
    </div>
  )
}
