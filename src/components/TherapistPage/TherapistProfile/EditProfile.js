import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import Therapistnav from '../../TherapistNav/Therapistnav';
import { useNavigate } from 'react-router-dom';

export default function AddProfile() {
  const [therapy, setTherapy] = useState([]);
  const [savedTherapy, setSavedTherapy] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    imageData: null,
    description: '',
    pricing: 0,
    address: '',
  });
  const navigate = useNavigate();
  const id = localStorage.getItem('therapistId');

  useEffect(() => {
    loadTherapy();
    loadExistingProfile(); // Fetch existing profile data if available
  }, []);

  const loadTherapy = async () => {
    const response = await axios.get('http://localhost:8080/therapy/categories');
    setTherapy(response.data);
  };


  const loadExistingProfile = async () => {
    try {
      const existingProfileResponse = await axios.get(`http://localhost:8080/therapist/${id}/description`);
      const existingProfileData = existingProfileResponse.data;

      if (existingProfileData) {
        setFormData(existingProfileData);
        setSavedTherapy(existingProfileData.therapy)
        console.log(existingProfileData)
      }
    } catch (error) {
      console.error('Error fetching existing profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = { ...formData };

    // if (name === 'imageData') {
    //   updatedFormData[name] = files[0];
    // } else {
    //   updatedFormData[name] = value;
    // }
    if (name === 'imageData') {
      updatedFormData[name] = files.length ? files[0] : updatedFormData.imageData;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'multipart/form-data',
    };


    try {
      const response = await axios.patch(`http://localhost:8080/description/update/${id}/${formData.selectedTherapy}`, formData, { headers });
      if (response.status === 200) {
        alert('Profile updated');
        navigate(`/therapist/${id}`);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error, e.g., display an error message to the user
    }
  };
  return (
    <div>
      <Navbar/>
      <Therapistnav/>      
      <div>
        <h1>EditProfile</h1>
      <form enctype="multipart/form-data" className='add-profile-form'>

        <label for="firstName">First Name</label>
        <input type='text' 
          id="firstName" 
          name ="firstName"
          value={formData.firstName}
          onChange={(e)=>handleInputChange(e)}
          />
        
        <label for="lastName">Last Name</label>
        <input type='text' 
               id="lastName" 
               name ="lastName"
               value={formData.lastName}
               onChange={(e)=>handleInputChange(e)}
               />               
        <input type='file' 
              id="imageData" 
              name ="imageData"
              onChange={(e)=>handleInputChange(e)}
              />
        <label for="address">Address</label> 
        <input type='text' 
               id="address" 
               name ="address"
               value={formData.address}
               onChange={(e)=>handleInputChange(e)}
               />
        <label for="description">description</label>
        <textarea 
              id="description" 
              name ="description"
              value={formData.description}
              onChange={(e)=>handleInputChange(e)}
              ></textarea>
        <label for="pricing">Pricing</label>
        <input type='text' 
              id="pricing"
              name ="pricing"
              value={formData.pricing}
              onChange={(e)=>handleInputChange(e)}
              />
        <label>Therapy</label>
        <select
          id="selectedTherapy"
          name="selectedTherapy"
          value={formData.selectedTherapy}
          onChange={(e) => handleInputChange(e)}
        >
          {therapy.map((th) => (
            <option key={th.id} value={th.specialty} selected={savedTherapy && savedTherapy.specialty === th.specialty}>
              {th.specialty}
            </option>
          ))}
        </select>
        <button onClick={handleSave} >Save</button>
      </form>
      </div>
    </div>
  )
}
