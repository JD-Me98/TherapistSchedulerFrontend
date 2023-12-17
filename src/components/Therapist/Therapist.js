import React from 'react';
import './Therapist.css';

export default function Therapist(props) {
  return (
    <div className='container'>
        <img src={props.imgsrc}
        className='therapist-img'
        alt='therapist1'/>
        <div className='details'>
            <div className='name'>
                <h3>{props.name}</h3>
            </div>
            <div>
                Specialty:<span class="light-text"> {props.specialty}</span>
            </div>
            <div className='therapist-pricing'>
                <span><h4>Rwf {props.pricing}</h4></span>
            </div>
            <button className='appointment-btn'>Make Appointment</button>
        </div>
    </div>
  )
}

