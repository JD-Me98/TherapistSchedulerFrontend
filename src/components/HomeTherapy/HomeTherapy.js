import React from 'react'
import './homeTherapy.css'
export default function HomeTherapy(props) {
  return (
    <div className='box'>
      <div className='therapy-box'>     
          <img src={props.image}
          alt='therapy-img'/>
          <div className='therapy-details'>
            <h2>{props.specialty}</h2>
            <p>{props.description}</p>
          </div>
        </div>
    </div>
  )
}
