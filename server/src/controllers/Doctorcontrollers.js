import { Clinicmodel } from "../models/Clinicmodel.js";
import { Doctormodel } from "../models/Doctormodel.js";
import { Usermodel } from "../models/Usermodel.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";

const addDoctorController = async (req, res) => {

    try {

        const { doctorname, speciality, degree, experience, gender, alternateNo, address, city, state, pincode, userID } = req.body

        if ([doctorname, speciality, degree, experience, gender, alternateNo, address, city, state, pincode, userID].some((field) => {
            field.trim() === ""
        })) {
           return res.status(200).send(
                {
                    message: "All fields are required",
                    status: "notsuccess"
                }
            )
        }



        const doctorprofileimagelocalpath = req.files?.profileImage[0].path
        console.log(doctorprofileimagelocalpath)

        if (!doctorprofileimagelocalpath) {
           return res.status(200).send(
                {
                    message: "Profileimage is required",
                    status: 'notsuccess'
                }
            )
        }


        const licenselocalpath = req.files?.licenseImage[0].path;
        console.log(licenselocalpath)

        if (!licenselocalpath) {
           return res.status(200).send(
                {
                    message: "Licenseimage is required",
                    status: 'notsuccess'
                }
            )

        }



        const doctorprofileimage = await uploadoncloudinary(doctorprofileimagelocalpath)

        const licenseimage = await uploadoncloudinary(licenselocalpath);





        const existingdoctor = await Doctormodel.findOne({ userID });

        if (existingdoctor) {
           return res.status(200).send(
                {
                    message: "Profile already created",
                    status: "notsuccess"
                }
            )
        }




        const doctor = await Doctormodel.create({
            doctorname, speciality, licenseImage: licenseimage.url, address, city, state, pincode, degree, experience, gender, alternateNo, userID, profileImage: doctorprofileimage.url



        })


        await Usermodel.findByIdAndUpdate(userID, { isprofilecreated: true });















        return res.status(200).send(
            {
                message: "Profilecreated successfully",
                status: "success",
                doctor,
                doctorid: doctor._id
            }
        )













    } catch (error) {
       return res.status(500).send(
            {
                message: `doctorcontroller error is: ${error}`,
                status: "notsuccess"
            }
        )

    }



}


const getDoctorController = async (req, res) => {
    try {
        const userID = req.params.id;

        const existingdoctor = await Doctormodel.findOne({ userID }).populate("userID").populate("clinics")

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
        return res.status(500).send({
            message: `getDoctorController error is: ${error}`,
            status: "notsuccess"
        });
    }
};

const updateDoctorController = async (req, res) => {
    try {
        const { userID } = req.params;
        const { doctorname, speciality, degree, experience, gender, alternateNo } = req.body

        const getdoctor = await Doctormodel.findOne({ userID })
        if (!getdoctor) {
            res.status(200).send({
                message: "doctorprofile not found",
                status: "notsuccess"
            })
        }

        const updatedata = {
            doctorname, speciality, degree, experience, gender, alternateNo

        }



        const updatedoctor = await Doctormodel.findOneAndUpdate(getdoctor, updatedata, { new: true })






        res.status(200).send({
            message: "doctor profile updated successfully",
            status: "success",
            updatedoctor

        })

        // get id userID,_id

        // find doctor 
        // update fiindbyidandupdate(userID},{req.body},{new:true})


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "failed to update",
            status: "failed",
            error


        })

    }

}

const updateDoctorimgController = async (req, res) => {


    try {

        const { userID } = req.params
        const doctorprofileimagefilelocalpath = req.files?.profileImage[0].path
        console.log(doctorprofileimagefilelocalpath)

        if (!doctorprofileimagefilelocalpath) {
            res.status(200).send(
                {
                    message: "Profileimage is required",
                    status: 'notsuccess'
                }
            )
        }





        const doctorprofileimage = await uploadoncloudinary(doctorprofileimagefilelocalpath)

        const getdoctor = await Doctormodel.findOne({ userID })
        if (!getdoctor) {
            res.status(200).send({
                message: "doctorprofile not found",
                status: "notsuccess"
            })
        }



        const updatedoctorimg = await Doctormodel.findOneAndUpdate({ userID }, { profileImage: doctorprofileimage.url }, { new: true })
        res.status(200).send(
            {
                message: "doctor image updated successfully",
                status: "success",
                getdoctor


            }
        )


    } catch (error) {
        res.status(500).send(
            {
                message: "doctor image not updated",
                status: "failed",
                error

            }
        )

    }
}

const getaClinicslist = async (req, res) => {
    try {
        const page = req.query.page
        const limit = req.query.limit

        const pageskip = (page - 1) * limit



        const clinics = await Clinicmodel.find().skip(pageskip).limit(limit);
        const total = await Clinicmodel.countDocuments();

        res.status(200).send({
            status: "success",
            totalpages: Math.ceil(total / limit),
            currentpage: page,
            totalrecords: total,
            clinics
        })


    } catch (error) {
        res.status(500).send(
            {
                message: `clinic list error:${error}`,
                status: "notsuccess"
            }
        )

    }

}


const addClinictoDoctor = async (req, res) => {
    try {
        const { doctorid, clinicid } = req.body;

        await Doctormodel.findByIdAndUpdate(
            doctorid,
            {
                $addToSet: { clinics: clinicid }
            },
            { new: true }
        )

        res.status(200).send(
            {
                message: "clinics added successfully",
                status: "success"
            }
        )

    } catch (error) {
        res.status(500).send(
            {
                message: `add clinic controller error ${error}`,
                status: "failed"


            }
        )

    }
}








export { addDoctorController, getDoctorController, updateDoctorController, updateDoctorimgController, getaClinicslist,addClinictoDoctor }




