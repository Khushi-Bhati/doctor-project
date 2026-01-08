import React from 'react'
import "./../../styles/Appointmentlist.css"
import Header from './Header'
import Sidebar from './Sidebar'

const Appoinmentlist = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="container">
          <h2 className="page-title">Today's Appointments</h2>
          <div className="appointment-table">
            {/* Header */}
            <div className="table-row table-head">
              <div>Patient</div>
              <div>Age</div>
              <div>Date</div>
              <div>Time</div>
              <div>Status</div>
              <div>Update</div>
            </div>
            {/* Row */}
            <div className="table-row">
              <div className="patient">
                <img src="https://cdn-icons-png.flaticon.com/512/387/387561.png" />
                <span>Rahul Sharma</span>
              </div>
              <div>32</div>
              <div>15 Dec 2025</div>
              <div>10:30 AM</div>
              <div><span className="status pending">Pending</span></div>
              <div>
                <select className="status-select">
                  <option>Update Status</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
            {/* Row */}
            <div className="table-row">
              <div className="patient">
                <img src="https://cdn-icons-png.flaticon.com/512/387/387561.png" />
                <span>Pooja Verma</span>
              </div>
              <div>27</div>
              <div>15 Dec 2025</div>
              <div>11:15 AM</div>
              <div><span className="status confirmed">Confirmed</span></div>
              <div>
                <select className="status-select">
                  <option>Update Status</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
            {/* Row */}
            <div className="table-row">
              <div className="patient">
                <img src="https://cdn-icons-png.flaticon.com/512/387/387561.png" />
                <span>Amit Singh</span>
              </div>
              <div>45</div>
              <div>15 Dec 2025</div>
              <div>12:00 PM</div>
              <div><span className="status completed">Completed</span></div>
              <div>
                <select className="status-select">
                  <option>Update Status</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>


  )
}

export default Appoinmentlist