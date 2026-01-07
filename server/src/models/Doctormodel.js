import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const doctorschema = new mongoose.Schema(
    {

        profileImage: {
            type: String,
            required: true


        },

        licenseImage: {
            type: String,
            required: true

        },


        doctorname: {
            type: String,
            required: true,
        },

        speciality: {
            type: String,
            required: true,
        },


        degree: {
            type: String,
            required: true

        },

        experience: {
            type: Number,
            required: true

        },

        gender: {
            type: String,
            required: true

        },

        alternateNo: {
            type: String,
            required: true

        },


        address: {
            type: String,
            required: true

        },

        city: {
            type: String,
            required: true,

        },

        state: {
            type: String,
            required: true

        },

        pincode: {
            type: String,
            required: true

        },

        isavailable: {
            type: Boolean,
            default: false
        },






        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            unique: true
        },
        clinics: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "clinic",

            }
        ],
        status: {
            type: String,
            enum: ["notverified", "approved", "rejected"],
            default: "notverified",
        },

    },
    {
        timestamps: true
    }

)

export const Doctormodel = mongoose.model("Doctor", doctorschema);