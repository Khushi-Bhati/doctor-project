import mongoose from "mongoose";



const Appointmentschema = new mongoose.Schema(
    {

        PatientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'patients',
            required: true
        },

        DoctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctors',
            required: true

        },
        ClinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'clinics',
            required: true

        },

        bookingDate: {
            type: String,
            required: true,
            unique: true
        },

        bookingTime: {
            type: String,
            required: true,
            unique: true

        },

        bookingStatus:{
            type:String,
            default:"Pending"
        }

    },
    {
        timestamps: true
    }
)


export const Appointemtmodel=mongoose.model("appointment",Appointmentschema)