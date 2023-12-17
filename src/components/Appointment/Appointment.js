import React, { useEffect, useState } from 'react'
import './appointment.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Appointment() {
    const [therapists,setTherapist]=useState([])
    const [schedule, setSchedule]=useState([])
    const [selectedTherapistId, setSelectedTherapistId] = useState(null);
    const [trackId, setTrackId]=useState('');
    const [appointment, setAppointment]=useState({
        firstName:"",
        lastName:"",
        email:"",
        message:"",
    })
    const [t_username, setT_username] = useState(null)
    const [a_date, setA_date] = useState(null)
    const navigate=useNavigate();
    const {firstName,lastName,email,message} = appointment

    const onInputChange=(e)=>{
        setAppointment({...appointment,[e.target.name]:e.target.value})
    };

    useEffect(()=>{
      loadTherapists()
    },[]);
  
    const loadTherapists=async()=>{
      const result=await axios.get("http://localhost:8080/therapist/therapists")
      setTherapist(result.data)
    }
    const loadSchedule=async(therapistId)=>{
        const result=await axios.get(`http://localhost:8080/therapist/schedule/${therapistId}`)
        setSchedule(result.data)
    }

    const handleTherapistChange = (event) => {
        event.preventDefault()
        const selectedId = event.target.value;
        setSelectedTherapistId(selectedId);
        loadSchedule(selectedId);

        handleUsernameChange(event);
    }
   const handleDateChange = (e)=>{
        const selectedDate = e.target.value
        setA_date(selectedDate);
   }
   const handleUsernameChange = (e)=>{
    const selectedUser = e.target.value
    setT_username(selectedUser);
}
    const saveAppointment=async(e)=>{
        e.preventDefault();

        console.log('Username:', t_username);
        console.log('Date:', a_date);

        const response = await axios.post(`http://localhost:8080/appointment/${t_username}/${a_date}`,appointment)
        if(response.status===201){          
            const sendMail = await axios.post(`http://localhost:8080/sendEmail/${therapists.email}/${response.data}`,appointment)
            try{
            if(sendMail.status===200){
                navigate("/")
            }else{
                alert("failed to send email!")
            }}catch(error){
                console.log('Axios error', error)
            }      
        }

    }
  return (
    <div>
        <div className='appointment-container'>
            <div>
                <h1>Make Your Appointment Today</h1>
            </div>
            <form className='login-form'>
                <div className='form-group'>
                    <span for='firstName'>First Name</span>
                    <input type='text' id='firstName' name='firstName' placeholder='First Name'
                        value={firstName}
                        onChange={onInputChange}/>
                </div>
                <div className='form-group'>
                    <span for='lastName'>Last Name</span>
                    <input type='text' id='lastName' name='lastName' placeholder='Last Name'
                        value={lastName}
                        onChange={onInputChange}/>    
                </div>
                <div className='form-group'>
                    <span for='email'>Email</span>
                    <input type='email' id='email' name='email' placeholder='example@gmail.com'
                        value={email}
                        onChange={onInputChange}/>
                </div>
                <div className='form-group'>
                    <span for='email'>Message</span><br/>
                    <textarea className='message-area' name='message' value={appointment.message} onChange={onInputChange}/>                    
                </div>
                <div className='form-group'>
                    <span for='email'>Therapist</span>
                    <select className='schedule-select'  onChange={handleTherapistChange} placeholder='Therapist'>
                        <option disabled selected>-- select Therapist --</option>
                        
                        {therapists.map((therapist) => (
                            <option key={therapist.id} value={therapist.id}>
                                {therapist.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <span for='email'>Schedule</span>
                    <select className='schedule-select' onChange={handleDateChange}>
                    <option disabled selected>-- choose Date --</option>
                    {
                    schedule.map((sched) =>(
                        <option>{sched.date}</option>
                    ))
                    }
                    </select>
                </div>
                <div className='form-group'>
                    <button className='login-button' onClick={saveAppointment}>Submit</button>
                </div>
            </form>
        </div>
    </div>

  )
}
