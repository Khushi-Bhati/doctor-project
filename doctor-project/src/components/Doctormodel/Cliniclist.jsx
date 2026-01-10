import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import "./../../styles/cliniclist.css"
import axios from 'axios'
import { Pagination } from 'antd';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Cliniclist = () => {
    const profileData = useSelector((state) => state.doctorprofile)
      console.log(profileData)
  
  const [loading, setLoading] = useState(false)

  const [limit, setLimit] = useState(3) // DEFAULT LIMIT
  const [clinics, setClinics] = useState([])
  const [totalpages, setTotalpages] = useState("")
  const [totalclinics, setTotalclinics] = useState("")
  const [currentpage, setCurrentPage] = useState(1)

  const getCliniclist = async () => {
    try {
      setLoading(true)
      let query = `${process.env.REACT_APP_API_URL}Hospital/doctor/getclinicslist?page=${currentpage}&limit=${limit}`

      const cliniclistresponse = await axios.get(query)

      if (cliniclistresponse.data.status === "success") {
        setClinics(cliniclistresponse.data.clinics)
        setTotalpages(cliniclistresponse.data.totalpages)
        setTotalclinics(cliniclistresponse.data.totalclinics)
      }

    } catch (error) {
      console.log("error is", error)
    } finally {
      setLoading(false)
    }
  }

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  };


  const handleaddClinic =async(clinicId) =>{
    try {
      const addClinicresponse = await axios.post("/Hospital/doctor/addtodoctor",{
        doctorid:profileData._id,
        clinicid:clinicId
      },
       {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )

      
    if (addClinicresponse.data.status === "success")
       {
       Swal.fire({
              title: addClinicresponse.data.message,
              icon: "success",
            })
          }
    } catch (error) {
      console.log("error:",error)
    }
  }



  useEffect(() => {
    getCliniclist()
  }, [currentpage, limit,])


  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="main-container">
        <Sidebar />
        <main className="main-content">
          <Header />


          <div className="cliniclist-container">
            {/* Page Title */}
            <h2 className="page-title">Clinics in Faridabad</h2>
            {/* Filter Bar */}
            <div className="filter-bar">
              <select>
                <option>Location</option>
                <option>Sector 86</option>
                <option>NIT</option>
                <option>Old Faridabad</option>
              </select>
              <select>
                <option>Speciality</option>
                <option>General Physician</option>
                <option>Dermatology</option>
                <option>Orthopedic</option>
              </select>
              <select>
                <option>Rating</option>
                <option>4+ Star</option>
                <option>3+ Star</option>
                <option>All</option>
              </select>
            </div>
            {/* Clinic Card */}
            {clinics.length > 0 ? (
              clinics.map((clinic, index) => (
                < div className="clinic-card">
                <div className="clinic-left">
                  <img className="clinic-logo" src={clinic.clinicImages[0]} />
                  <div className="clinic-info">
                    <h3>{clinic.clinicname}</h3>
                    <p className="location">General Health Clinic • {clinic.address}</p>
                    <p className="fees">₹600 Consultation Fees</p>
                    <p className="open">Open Today 7:00 AM - 1:00 PM</p>
                    <div className="doctor">
                      <img src="https://cdn-icons-png.flaticon.com/512/387/387561.png" />
                      <div>
                        <strong>Dr. Maheshwar Chawla</strong>
                        <span>General Physician • 19 yrs exp</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clinic-right">
    
                  <button onClick={() =>handleaddClinic(clinic._id)} className="add-btn">+ Add</button>
                </div>
              </div>)))
              : (<p>No Clinics found</p>)}


           
            {/* Clinic Card */}
              <div className="pagination">
              <Pagination
                showQuickJumper
                pageSizeOptions={[4, 8, 12, 20]}
                current={currentpage}
                pageSize={limit}
                defaultCurrent={2}
                total={totalclinics}
                style={{ marginTop: 20, textAlign: "center" }}
                onChange={onChange} />
            </div>
          </div>




        </main>
      </div>
    </>
  )
}

export default Cliniclist
