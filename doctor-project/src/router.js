
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,

} from "react-router-dom";





import Dashboard from "./components/Doctormodel/Dashboard.jsx";
import Createdoctorprofile from "./components/Createdoctorprofile.jsx"

import App from "./App";
import Createpatientprofile from "./components/Createpatientprofile.jsx";
import PatientDashboard from "./components/Patientmodel/PatientDashboard.jsx";
import PatientProfile from "./components/Patientmodel/PatientProfile.jsx";
import Doctorslist from "./components/Patientmodel/Doctorslist.jsx";


import Protectedroute from "./components/Protectedroute.jsx";
import Profile from "./components/Doctormodel/Profile.jsx";
import Loginform from "./components/Loginform.jsx";
import Registerform from "./components/Registerform.jsx";
import Addclinic from "./components/Clinicmodel/Addclinic.jsx";
import Clinicdashboard from "./components/Clinicmodel/Clinicdashboard.jsx";
import Clinicprofile from "./components/Clinicmodel/Clinicprofile.jsx";
import ClinicList from "./components/Doctormodel/Cliniclist.jsx";

import Doctorfullprofile from "./components/Patientmodel/Doctorfullprofile.jsx";
import LandingPage from "./components/Landing Page/Landingpage.jsx";
import Appoinmentlist from "./components/Doctormodel/Appoinmentlist.jsx";
import About from "./components/Landing Page/About.jsx";
import Doctorlisting from "./components/Clinicmodel/Doctorlisting.jsx";
import Departments from "./components/Landing Page/Department.jsx";
import Contact from "./components/Landing Page/Contact.jsx";







const router = createBrowserRouter(
  createRoutesFromElements(

    <Route>

      <Route path="/" element={<App />}>

        <Route index element={<LandingPage />} />

<Route path="/about" element={<About/>}/>
<Route path="/department" element={<Departments/>}/>
<Route path="/contact" element={<Contact/>}/>




        <Route path="/" element={<Protectedroute />}>

          <Route path="/doctor" element={<Createdoctorprofile />} />
          <Route path="/patient" element={<Createpatientprofile />} />


          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/patientdashboard" element={<PatientDashboard />} />
          <Route path="/patientprofile/:id" element={<PatientProfile />} />
          <Route path="/doctorslist" element={<Doctorslist />} />
          <Route path="/addclinic" element={<Addclinic />} />
          <Route path="/clinicdashboard" element={<Clinicdashboard />} />
          <Route path="/clinicprofile/:id" element={<Clinicprofile />} />
          <Route path="/clinicslist" element={<ClinicList />} />
          <Route path="/doctorfullprofile/:id" element={<Doctorfullprofile />} />
          <Route path="/appoinmentlist" element={<Appoinmentlist />} />
              <Route path="/doctorslisting" element={<Doctorlisting />} />


        </Route>








      </Route>

      <Route path="/login" element={<Loginform />} />
      <Route path="/register" element={<Registerform />} />

    </Route>




  )
);

export default router;