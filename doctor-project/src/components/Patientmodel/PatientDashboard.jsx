import React, { useEffect } from 'react'

import PatientHeader from './PatientHeader'
import "./../../styles/panel.css"
import { useSelector, useDispatch } from 'react-redux'
import PatientSidebar from './Patierntsidebar'
import axios from 'axios';
import { setPatientprofile } from '../../reducers/Reducers.js'

const PatientDashboard = () => {
    const Dispatch = useDispatch()
    const PatientprofileData = useSelector((state) => state.patientprofile)
    console.log(PatientprofileData)


    const getPatientprofile = async () => {
        try {
            const patientprofileresponse = await axios.get(`${process.env.REACT_APP_API_URL}Hospital/patient/getpatient/${localStorage.getItem("loginid")}`)
            console.log("Patient response:", patientprofileresponse.data);

            if (patientprofileresponse.data.status === "success") {
                Dispatch(setPatientprofile(patientprofileresponse.data.existingPatient))
            }
            else {
                console.log("something went wrong")
            }
        } catch (error) {
            console.log(error)
        }

    }

    if (!PatientprofileData) {

        getPatientprofile()

    }


    return (
        <><div className="main-container" >
            <PatientSidebar />
            <main class="main-content">
                <PatientHeader />
                <div className="dashboard-container">
                    <div className="welcome-banner">
                        <div className="welcome-text">
                            <h1>Good Morning, <b>{PatientprofileData?.patientname}</b></h1>
                            <p>Your health journey continues with care.</p>
                        </div>
                        <img src="https://merakiui.com/images/components/illustration.svg" alt="Illustration" className="welcome-illustration" />
                    </div>
                    <div className="stats-grid">
                        {/* Stat Cards */}
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon appointments">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg></div>
                                <h3 className="stat-title">Upcoming Appointments</h3>
                            </div>
                            <p className="stat-value">49</p>
                            <div className="stat-comparison positive"><svg width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            </svg><span>40% vs last month</span></div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon patients"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-2 5.5A2.5 2.5 0 015.5 9h-1a3.5 3.5 0 00-3.5 3.5v1a1 1 0 001 1h5.5a1 1 0 001-1v-1a2.5 2.5 0 01-2.5-2.5zM15 6a3 3 0 11-6 0 3 3 0 016 0zm-2 5.5A2.5 2.5 0 0113.5 9h-1a3.5 3.5 0 00-3.5 3.5v1a1 1 0 001 1h5.5a1 1 0 001-1v-1a2.5 2.5 0 01-2.5-2.5z" />
                                </svg></div>
                                <h3 className="stat-title">Health reports</h3>
                            </div>
                            <p className="stat-value">23</p>
                            <div className="stat-comparison positive"><svg width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            </svg><span>20% vs last month</span></div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon cancel"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                                </svg></div>
                                <h3 className="stat-title">Cancel Bookings</h3>
                            </div>
                            <p className="stat-value">5</p>
                            <div className="stat-comparison negative"><svg width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg><span>15% vs last month</span></div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon visited"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                </svg></div>
                                <h3 className="stat-title">Prescription</h3>
                            </div>
                            <p className="stat-value">21</p>
                            <div className="stat-comparison positive"><svg width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            </svg><span>30% vs last month</span></div>
                        </div>
                    </div>
                    <div className="dashboard-section">
                        <div className="list-card">
                            <div className="list-card-header">
                                <h3>Recent Bookings</h3>
                                <a id="showAllLink">Show all</a>
                            </div>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Doctor</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=tony" alt="Patient" /><span><b>Tony Stark</b></span></div>
                                            </td>
                                            <td>Dr. Ritesh Sharma</td>
                                            <td>17 Mar 2025</td>
                                            <td>10:30 AM</td>
                                            <td><span className="status-pill confirmed">Confirmed</span></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=steve" alt="Patient" /><span><b>Shailender</b></span></div>
                                            </td>
                                            <td>Dr. D3</td>
                                            <td>25 Mar 2025</td>
                                            <td>02:00 PM</td>
                                            <td><span className="status-pill pending">Pending</span></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=bruce" alt="Patient" /><span><b>Rahul Tanwer</b></span></div>
                                            </td>
                                            <td>Dr. Rahul Bisht</td>
                                            <td>27 Mar 2025</td>
                                            <td>11:00 AM</td>
                                            <td><span className="status-pill cancelled">Cancelled</span></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=natasha" alt="Patient" /><span><b>Sahil malik</b></span></div>
                                            </td>
                                            <td>Dr. Kush Kumar</td>
                                            <td>22 Jul 2025</td>
                                            <td>04:15 PM</td>
                                            <td><span className="status-pill confirmed">Confirmed</span></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=thor" alt="Patient" /><span><b>Shubham jai</b></span></div>
                                            </td>
                                            <td>Dr. Rohit Gaur</td>
                                            <td>23 Jul 2025</td>
                                            <td>09:00 AM</td>
                                            <td><span className="status-pill confirmed">Confirmed</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="list-card">
                            <div className="list-card-header">
                                <h3>Recent Patients</h3>
                                <a href="#">Show all</a>
                            </div>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Last Visit</th>
                                            <th>Condition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=patient1" alt="Patient" /><span><b>Peter Parker</b></span></div>
                                            </td>
                                            <td>15 Jan 2025</td>
                                            <td>Flu</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=patient2" alt="Patient" /><span><b>preety jain</b></span></div>
                                            </td>
                                            <td>20 Mar 2025</td>
                                            <td>Allergies</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=patient3" alt="Patient" /><span><b>Pooja</b></span></div>
                                            </td>
                                            <td>10 Apr 2025</td>
                                            <td>Sprained Ankle</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=patient4" alt="Patient" /><span><b>Sarish</b></span></div>
                                            </td>
                                            <td>05 May 2025</td>
                                            <td>Routine Checkup</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="patient-info"><img src="https://i.pravatar.cc/150?u=patient5" alt="Patient" /><span><b>XYZ</b></span></div>
                                            </td>
                                            <td>28 Jun 2025</td>
                                            <td>Headache</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>

        </>
    )
}

export default PatientDashboard
