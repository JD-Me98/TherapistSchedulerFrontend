import React, {useEffect,useState} from 'react'
import './home.css'
import axios from 'axios'
import HomeTherapy from '../components/HomeTherapy/HomeTherapy';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [therapies,setTherapy]=useState([])
  const navigate=useNavigate()

  const hanleMakeAppointment=()=>{
    navigate('/appointment')
  }

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
      <div className='home-header'>
        <div className='call-to-action'>
          <p>"Ready to take the first step towards a happier, more fulfilling life? Schedule your confidential session with our caring therapists today. Let's embark on this journey together, guiding you towards the peace and clarity you deserve."</p>
          <p className='message-highlight'>Your healing starts here.</p>
          <br/>
          <button className='login-button' onClick={hanleMakeAppointment} ><h3>Make an appointment</h3></button>
        </div>          
      </div>
      <div className='home-container'>
        <h1 className='h2-titles'>some of the therapy we offer!</h1>
        <div className='therapy-section'>        
          {
            therapies.slice(0,3).map((therapy)=>(
              <HomeTherapy
              image={therapy.img_url}
              description={therapy.description}
              specialty={therapy.specialty}
            />
            ))
          }
        </div>
      </div>
    </div>
  )
}
