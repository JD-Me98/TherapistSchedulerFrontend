import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar/Navbar'
import axios from 'axios'
import './pages.css'
import Therapistnav from '../components/TherapistNav/Therapistnav'

export default function TherapistAppointments() {

    const [appointments,setAppointments]=useState([])
    const [schedule, setSchedule]=useState([])

    const userId = localStorage.getItem('therapistId')

    useEffect(()=>{
      loadAppointments()
    },[]);
  
    const loadAppointments=async()=>{
      const result=await axios.get(`http://localhost:8080/appointments/${userId}/all`)
      setAppointments(result.data)
      setSchedule(result.data.therapistSchedule)
    }
    const handleApprove = async (trackId)=>{
        const result=await axios.put(`http://localhost:8080/appointment/${trackId}/update`)
        window.location.reload();
        }
  return (
    <div>
        <Navbar/>
        <Therapistnav/>
        <div className='appointment-main'>
            <div className='appointments-container'>
                <div><h1>Appointments</h1></div>
                <table className='appointments-tbl'>
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>trackId</th>
                        <th>status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                    {
                
                appointments.map((appointment) =>(
                        <tr>
                            <td>{appointment.firstName}</td>
                            <td>{appointment.lastName}</td>
                            <td>{appointment.email}</td>
                            <td>{appointment.message}</td>
                            <td>{appointment.therapistSchedule.date}</td>
                            <td>{appointment.trackId}</td>
                            <td>{appointment.status}</td>
                            <td className='tbl-action'><button onClick={()=>handleApprove(appointment.trackId)}>Approve</button><button>Decline</button></td>

                        </tr>
                ))
                    }
                    </tbody>

                </table>
            </div>
        </div>
    </div>
  )
}
