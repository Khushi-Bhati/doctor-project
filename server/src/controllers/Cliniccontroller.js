import { Clinicmodel } from "../models/Clinicmodel.js";
import { Doctormodel } from "../models/Doctormodel.js";
import { Usermodel } from "../models/Usermodel.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";

const addClinicController = async (req, res) => {
    try {
        const { clinicname, address, contact, email, openingtime, closingtime, totalDoctors, userID, } = req.body;
        if ([clinicname, address, contact, email, openingtime, closingtime, totalDoctors, userID,].some((field) => {
            field.trim() === ""
        })) {
            res.status(200).send(
                {
                    message: "All fields are required",
                    status: "notsuccess",
                }
            )
        }
        const existingClinic = await Clinicmodel.findOne({ userID, })

        if (existingClinic) {
            res.status(200).send({
                message: " clinic already exist",
                status: "notsuccess"
            })
        }

        const clinicimagespath = req.files?.clinicImages?.map(file => file.path)
        console.log("my clinic images localpath", clinicimagespath)

        const imageUrls = [];

        if (clinicimagespath.length > 0) {
            for (let i = 0; i < clinicimagespath.length; i++) {
                const result = await uploadoncloudinary(clinicimagespath[i]);
                imageUrls.push(result.url);
            }
        }





        const clinic = await Clinicmodel.create({
            clinicname, address, contact, email, openingtime, closingtime, totalDoctors, userID, clinicImages: imageUrls,

        })


        await Usermodel.findByIdAndUpdate(userID, { isprofilecreated: true });

        res.status(200).send({
            message: "Clinic add successfuly",
            status: "success",
            clinic,
            clinicid: clinic._id
        })

    } catch (error) {
        res.status(500).send(
            {
                message: `Add clinic controller error,${error}`,
                status: "failed"
            }
        )
    }

}

const getClinicController = async (req, res) => {
    try {
        const userID = req.params.id;

        const existingclinic = await Clinicmodel.findOne({ userID }).populate("userID");

        if (!existingclinic) {
            return res.status(200).send({
                message: "Clinic not found",
                status: "notsuccess"
            });
        }

        return res.status(200).send({
            message: "Profile fetched successfully",
            status: "success",
            existingclinic
        });

    } catch (error) {
        return res.status(500).send({
            message: `getClinicController error is: ${error}`,
            status: "notsuccess"
        });
    }
}

const updateClinicController = async (req, res) => {
    try {
        const { userID } = req.params;
        const { clinicname, address, contact, email, openingtime, closingtime, totalDoctors, } = req.body

        const getclinic = await Clinicmodel.findOne({ userID })
        if (!getclinic) {
            res.status(200).send({
                message: "clinic profile not found",
                status: "notsuccess"
            })
        }

        const updatedata = {
            clinicname, address, contact, email, openingtime, closingtime, totalDoctors,

        }



        const updateclinic = await Clinicmodel.findOneAndUpdate(getclinic, updatedata, { new: true })






        res.status(200).send({
            message: "clinic profile updated successfully",
            status: "success",
            updateclinic

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
const updateDoctorStatus = async (req, res) => {
    try {
        const { doctorid, status } = req.body;


        const doctor = await Doctormodel.findByIdAndUpdate(
            doctorid,
            { status },
            { new: true }
        )

        res.status(200).send({
            message: `Doctor ${status} successfully`,
            doctor,
        })

    } catch (error) {
        res.status(500).send({
            message: "Status update failed",
            error: error.message,
        });
    }
};

export { addClinicController, getClinicController, updateClinicController, updateDoctorStatus }