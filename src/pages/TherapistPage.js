import React from 'react'
import Therapistnav from '../components/TherapistNav/Therapistnav';
import TherapistProfile from '../components/TherapistPage/TherapistProfile/Profile';
import Schedule from '../components/TherapistSchedule/Schedule';
import Navbar from '../components/Navbar/Navbar';

export default function TherapistPage() {
  return (
    <div>
      <Navbar/>
      <Therapistnav/>
      <TherapistProfile/>
      
  </div>
  )
}
