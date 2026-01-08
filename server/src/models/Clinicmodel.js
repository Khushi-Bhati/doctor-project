import mongoose from "mongoose"

const clinicSchema = new mongoose.Schema(
    {
        clinicname: {
            type: String,
            required: true
        },

        clinicImages: [
            {
                type: String,
                required: true,
            }
        ],

        address: {
            type: String,
            required: true
        },

        contact: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
        },

        openingtime: {
            type: String,
            required: true
        },
        closingtime:{
             type: String,
            required: true
        },

        totalDoctors: {
            type: String,
            required: true,

        },
       
        userID: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            

        },


     
      
       

    },
    {
        timestamps: true
    }
)

export const Clinicmodel = mongoose.model("clinic", clinicSchema)