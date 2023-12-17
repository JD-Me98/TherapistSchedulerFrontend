import React from 'react'
import './Therapy.css'

export default function Therapy(props) {
  return (
    <div>
      <div className='category-box'>
        <img src={props.image}
         alt='therapy-img'/>
        <div className='category-details'>
          <h2>{props.specialty}</h2>
          <p>{props.description}</p>
        </div>
      </div>
    </div>

  )
}
