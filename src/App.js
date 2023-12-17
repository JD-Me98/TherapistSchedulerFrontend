import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Therapists from './pages/Therapists';
import AppointmentTracker from './pages/Appointment_tracker';
import TherapyCategory from './pages/Therapy_category';
import Therapistlogin from './components/TherapistLogin/Therapistlogin';
import Therapistsignup from './components/TherapistSignup/TherapistSignup';
import TherapistPage from './pages/TherapistPage';
import EditProfile from './components/TherapistPage/TherapistProfile/EditProfile';
import { UserProvider } from './components/userContext';
import TherapistAppointments from './pages/TherapistAppointments';
import Schedule from './components/TherapistSchedule/Schedule';
import AddProfile from './components/TherapistPage/TherapistProfile/AddProfile';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';



function App() {
  return (
      <div className='myapp'>
            <div>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/appointment" element={<Appointment/>}/>
                <Route path="/therapists" element={<Therapists/>} />
                <Route path="/therapyCategory" element={<TherapyCategory/>} />
                <Route path="/appointmentTracker" element={<AppointmentTracker/>} />
                <Route path="/login" element={<Therapistlogin/>}/>
                <Route path="/signup" element={<Therapistsignup/>}/>
                <Route path="/therapist/:userId" element={<TherapistPage/>}/>
                <Route path="/therapist/:userId/description" element={<EditProfile/>}/>
                <Route path="/therapist/schedule/:id" element={<Schedule/>}/>
                <Route path="/therapist/appointments" element={<TherapistAppointments/>}/>
                <Route path="/therapist/profile/:id/add" element={<AddProfile/>}/>
                <Route path="/admin" element={<AdminLogin/>}/>
                <Route path="/admin/:id" element={<Admin/>}/>
              </Routes>
            </div>
        </div>
  );
}

export default App;
