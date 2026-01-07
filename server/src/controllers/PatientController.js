import { Doctormodel } from "../models/Doctormodel.js";
import { Patientmodel } from "../models/Patientmodel.js";
import { Usermodel } from "../models/Usermodel.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";

const addPatientController = async (req, res) => {
    try {
        const { patientname, gender, DOB, bloodgroup, height, weight, injuries, familymedicalhistory,
            exerciseroutine, alcohol, smoking, allergies, address, alternateNo, userID } = req.body;

        if ([patientname, gender, DOB, bloodgroup, height, weight, injuries, familymedicalhistory,
            exerciseroutine, alcohol, smoking, allergies, address, alternateNo, userID].some((field) =>
                field.trim() === ""
            )) {
            res.status(200).send({
                message: "All fields are required",
                status: "notsuccess"
            })
        }

        const patientprofileimagelocalpath = req.files?.profileImage[0].path

        if (!patientprofileimagelocalpath) {
            res.status(200).send({
                message: "profile image is required",
                status: "notsuccess"
            })
        }

        console.log(patientprofileimagelocalpath)
        const patientprofileimage = await uploadoncloudinary(patientprofileimagelocalpath)

        console.log(patientprofileimage)

        const healthinsuranceimglocalpath = req.files?.healthinsurance[0].path
        if (!healthinsuranceimglocalpath) {
            res.status(200).send({
                message: "health insurame image is required",
                status: "notsuccess"
            })
        }



        const healthinsuranceimage = await uploadoncloudinary(healthinsuranceimglocalpath)

        const existingpatient = await Patientmodel.findOne({ userID })

        if (existingpatient) {
            res.status(200).send({
                message: "patient already exist",
                status: "notsuccess"
            })
        }

        const Patient = await Patientmodel.create({
            patientname, gender, DOB, bloodgroup, height, weight, injuries, familymedicalhistory,
            exerciseroutine, alcohol, smoking, allergies, address, alternateNo, userID, profileImage: patientprofileimage.url,
            healthinsurance: healthinsuranceimage.url

        })

        await Usermodel.findByIdAndUpdate(userID, { isprofilecreated: true })

        res.status(200).send({
            message: "Patient profile created successfully",
            status: 'success',
            Patient,
            patientid:Patient._id

        })
    } catch (error) {
        res.status(500).send({
            message: `Patient Controller error is: ${error} `,
            status: "failed"

        })

    }

}

const getPatientController = async (req, res) => {
    try {
        const userID = req.params.id;

        const existingPatient = await Patientmodel.findOne({ userID }).populate("userID");

        if (!existingPatient) {
            return res.status(404).send({
                message: "Patient not found",
                status: "notsuccess"
            });
        }

        res.status(200).send({
            message: "Profile fetched successfully",
            status: "success",
            existingPatient,
        });

    } catch (error) {
        res.status(500).send({
            message: `getPatientController error: ${error.message}`,
            status: "notsuccess"
        });
    }
};

const updatePatientController = async (req, res) => {
    try {
        const { userID } = req.params;
        const { patientname, gender, DOB, bloodgroup, height, weight, injuries, familymedicalhistory,
            exerciseroutine, alcohol, smoking, allergies, address, alternateNo, } = req.body;

        const getpatient = await Patientmodel.findOne({ userID })
        if (!getpatient) {
            res.status(200).send({
                message: "patientprofile not found",
                status: "notsuccess"
            })
        }

        const updatedata = {
            patientname, gender, DOB, bloodgroup, height, weight, injuries, familymedicalhistory,
            exerciseroutine, alcohol, smoking, allergies, address, alternateNo,

        }



        const updatepatient = await Patientmodel.findOneAndUpdate(getpatient, updatedata, { new: true })






        res.status(200).send({
            message: "patient profile updated successfully",
            status: "success",
            updatepatient

        })




    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "failed to update",
            status: "failed",
            error


        })

    }

}

const updatePatientimgController = async (req, res) => {


    try {

        const { userID } = req.params
        const patientprofileimagefilelocalpath = req.files?.profileImage[0].path
        console.log(patientprofileimagefilelocalpath)

        if (!patientprofileimagefilelocalpath) {
            res.status(200).send(
                {
                    message: "Profileimage is required",
                    status: 'notsuccess'
                }
            )
        }





        const patientprofileimage = await uploadoncloudinary(patientprofileimagefilelocalpath)

        const getpatient = await Patientmodel.findOne({ userID })
        if (!getpatient) {
            res.status(200).send({
                message: "patientprofile not found",
                status: "notsuccess"
            })
        }



        const updatepatientimg = await Patientmodel.findOneAndUpdate({ userID }, { profileImage: patientprofileimage.url }, { new: true })
        res.status(200).send(
            {
                message: "patient image updated successfully",
                status: "success",
                getpatient


            }
        )


    } catch (error) {
        res.status(500).send(
            {
                message: "patient image not updated",
                status: "failed",
                error: error.message

            }
        )

    }
}

const updateInsuranceimgController = async (req, res) => {


    try {

        const { userID } = req.params
        const insuranceimagefilelocalpath = req.files?.healthinsurance[0].path
        console.log(insuranceimagefilelocalpath)

        if (!insuranceimagefilelocalpath) {
            res.status(200).send(
                {
                    message: "insurance image is required",
                    status: 'notsuccess'
                }
            )
        }





        const insuranceimage = await uploadoncloudinary(insuranceimagefilelocalpath)

        const getpatientprofile = await Patientmodel.findOne({ userID })
        if (!getpatientprofile) {
            res.status(200).send({
                message: "insurance img not found",
                status: "notsuccess"
            })
        }



        const updateinsuranceimg = await Patientmodel.findOneAndUpdate({ userID }, { healthinsurance: insuranceimage.url }, { new: true })
        res.status(200).send(
            {
                message: "insurance image updated successfully",
                status: "success",
                getpatientprofile


            }
        )


    } catch (error) {
        res.status(500).send(
            {
                message: "insurance image not updated",
                status: "failed",
                error: error.message

            }
        )

    }
}

const getaDoctorslist = async (req, res) => {
    try {
        const page = req.query.page
        const limit = req.query.limit
        const doctorname = req.query.doctorname
        const greaterexperience = Number(req.query.greaterexperience)
        const minimumexperience = Number(req.query.minimumexperience)
        const speciality = req.query.speciality
        const pageskip = (page - 1) * limit

        const filter = {}

        if (doctorname) {
            filter.doctorname = { $regex: doctorname, $options: "i" }
        }


        if (Number(minimumexperience) && Number(greaterexperience)) {
            filter.experience = { $gte: minimumexperience, $lte: greaterexperience }
        }

        if (speciality) {
            filter.speciality = { $regex: speciality, $options: "i" }
        }


        const doctors = await Doctormodel.find(filter).skip(pageskip).limit(limit).populate("userID").populate("clinics")
        const total = await Doctormodel.countDocuments(filter);

        res.status(200).send({
            status: "success",
            totalpages: Math.ceil(total / limit),
            currentpage: page,
            totalrecords: total,
            doctors
        })


    } catch (error) {
        res.status(500).send(
            {
                message: `doctor list error:${error}`,
                status: "notsuccess"
            }
        )

    }

}



const getDoctorprofileByDoctorid=async(req,res)=>{
    try {
         const doctorID = req.params.id;

        const existingdoctor = await Doctormodel.findById(doctorID).populate("userID").populate("clinics")

        if (!existingdoctor) {
            return res.status(200).send({
                message: "Doctor not found",
                status: "notsuccess"
            });
        }

        return res.status(200).send({
            message: "Profile fetched successfully",
            status: "success",
            existingdoctor
        });


        
    } catch (error) {
        res.status(500).send(
            {
                message:`getdoctorbyid error ${error}`,
                status:"notsuccess"
            }
        )
        
    }
}


export { addPatientController, getPatientController, updatePatientController, updatePatientimgController, updateInsuranceimgController, getaDoctorslist,getDoctorprofileByDoctorid}

