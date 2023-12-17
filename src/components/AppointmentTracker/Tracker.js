import React, { useState } from 'react';
import './tracker.css';
import axios from 'axios';

export default function Tracker() {
  const [appointment, setAppointment] = useState([]);
  const [trackId, setTrackId] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [therapist, setTherapist] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/appointment/track/${trackId}`);
      if (response.status === 200) {
        setAppointment(response.data);
        setSchedule(response.data.therapistSchedule);
        setTherapist(response.data.therapist);
        console.log(response.data);
        setShowResult('show')
      } else {
        alert('Appointment not Found!');
      }
    } catch (error) {
      console.error('Error retrieving appointment:', error);
      alert('Error retrieving appointment. Please try again.');
    }
    toggleResults();
  };

  const toggleResults = () => {
    setShowResult(!showResult);
  };

  return (
    <div className='tracker'>
      <div className='track-card'>
        <h1>Appointment Tracker</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='trackId'>Tracking id</label>
          <input
            type='text'
            id='trackId'
            name='trackId'
            className='track-input'
            placeholder='Tracking Id'
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
          />
          <button type='submit' className='track-button'>
            Track
          </button>
        </form>
      </div>
      {(showResult &&
      <div className="track-result ">
          <div><h2>Your appointment</h2></div>
          <div className='t_results'>
            <div>
               <b>Name:</b> {appointment.firstName + appointment.lastName}
            </div>
            <div>
              <b>Email:</b> {appointment.email}
            </div>
            <div>
              <b>status:</b> {appointment.status}
            </div>
            <div>
              <b>Therapist:</b> {therapist.username}
            </div>
            <div>
              <b>Date:</b> {schedule.date}
            </div>
            <br/>
            
            <div className='results-buttons'>
              <button className='track-button'>Cancel Appointment</button>
              <button className='track-button' onClick={toggleResults}>Back</button>
            </div>
            
          </div>
      </div>
      )}
    </div>
  );
}