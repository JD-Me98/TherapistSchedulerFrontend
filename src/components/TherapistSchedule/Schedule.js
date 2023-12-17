import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './schedule.css'
import Therapistnav from '../TherapistNav/Therapistnav';

export default function Schedule() {
    const [schedule, setSchedule]=useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // Initialize with null

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value); // Update the selectedDate state with the input value
      };


    const {id} = useParams();
    const navigate= useNavigate();
    useEffect(()=>{
        loadSchedule();
      },[]);
    
      const loadSchedule=async() => {
        const result=await axios.get(`http://localhost:8080/therapist/schedule/${id}`)
        setSchedule(result.data)
        console.log(result.data)
      }

    const saveSchehedule=async(e)=>{
        e.preventDefault();

        const dateObject = new Date(selectedDate);
        if (!isNaN(dateObject)) {
            const data = {
            date: dateObject.toISOString(), // Convert the date to ISO string format
          };
          try{ 
            const response = await axios.post(`http://localhost:8080/schedule/${id}/save`, data, {
          headers: {
            'Content-Type': 'application/json', // Ensure content type is JSON if sending JSON data
          },
        });
        if (response.status===200){
            window.location.reload();
        }
          }catch(error){
            console.error('Error',error)
          }
        }
    }
    
    const handleDelete=async(s_Id)=>{
        const response=await axios.delete(`http://localhost:8080/therapist/schedule/delete/${s_Id}`)
        window.location.reload();

    }
   
  return (
    <div>
      <Navbar/>
      <Therapistnav/>
      <div className='schedule-container'>
        <div className='therapist-schedule'>
          <h1>Set Your Schedule</h1>
          <form>
              <label for='date'>Schedule a Date</label><br/>
              <input type='date' 
                    id='date' 
                    name='date'
                    value={selectedDate}
                    onChange={handleDateChange}/>
              <button onClick={(e)=>saveSchehedule(e)}>Set Schedule</button>
                    
          </form>
          <table>
              <thead>
                  <th>index</th>
                  <th>Schedule</th>
                  <th>Action</th>
              </thead>
              <tbody>
                  {
              schedule.map((sche,index) => (
                  <tr>
                      <td>{index+1}</td>
                      <td>{sche.date}</td>
                      <td><button onClick={(e)=>handleDelete(sche.id)}>Delete</button></td>
                  </tr>            
              ))
              }
                  <tr></tr>
                  <tr></tr>
              </tbody>
              
          </table>
        </div>
      </div>
    </div>

  )
}