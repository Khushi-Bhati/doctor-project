import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    doctorprofile: null,
    patientprofile: null,
    clinicprofile: null,
    bookinglists: [],
    cliniclist: [],
    patientlist: [],
    doctorlist: [],


}


const DoctorSlice = createSlice({
    name: "Doctor",
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            state.doctorprofile = action.payload
        },


        setBookingLists: (state, action) => {
            state.bookinglists = action.payload
        },

        setPatientprofile: (state, action) => {
            state.patientprofile = action.payload
        },

        setClinicprofile: (state, action) => {
            state.clinicprofile = action.payload
        },

        setDoctorList: (state, action) => {
            state.doctorlist = action.payload
        },




    }
})

export const { setProfileData, setBookingLists, setPatientprofile, setClinicprofile,setDoctorList } = DoctorSlice.actions;

export const Doctorreducer = DoctorSlice.reducer