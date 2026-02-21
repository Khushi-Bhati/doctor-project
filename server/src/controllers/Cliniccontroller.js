import { Clinicmodel } from "../models/Clinicmodel.js";
import { Doctormodel } from "../models/Doctormodel.js";
import { Usermodel } from "../models/Usermodel.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";

const addClinicController = async (req, res) => {
    try {
        const { clinicname, address, contact, email, openingtime, closingtime, totalDoctors, userID } = req.body;

        if ([clinicname, address, contact, email, openingtime, closingtime, totalDoctors, userID].some((field) => !field || field.trim() === "")) {
            return res.status(400).send({ message: "All fields are required", status: "notsuccess" });
        }

        const existingClinic = await Clinicmodel.findOne({ userID });
        if (existingClinic) {
            return res.status(200).send({ message: "Clinic already exists", status: "notsuccess" });
        }

        const clinicimagespath = req.files?.clinicImages?.map(file => file.path) || [];

        const imageUrls = [];
        for (let i = 0; i < clinicimagespath.length; i++) {
            const result = await uploadoncloudinary(clinicimagespath[i]);
            if (result && result.url) imageUrls.push(result.url);
        }

        const clinic = await Clinicmodel.create({
            clinicname, address, contact, email,
            openingtime, closingtime, totalDoctors, userID,
            clinicImages: imageUrls
        });

        await Usermodel.findByIdAndUpdate(userID, { isprofilecreated: true });

        return res.status(200).send({
            message: "Clinic added successfully",
            status: "success",
            clinic,
            clinicid: clinic._id
        });

    } catch (error) {
        return res.status(500).send({
            message: `addClinicController error: ${error.message}`,
            status: "failed"
        });
    }
};


const getClinicController = async (req, res) => {
    try {
        const userID = req.params.id;
        const existingclinic = await Clinicmodel.findOne({ userID }).populate("userID");

        if (!existingclinic) {
            return res.status(404).send({ message: "Clinic not found", status: "notsuccess" });
        }

        return res.status(200).send({
            message: "Profile fetched successfully",
            status: "success",
            existingclinic
        });

    } catch (error) {
        return res.status(500).send({
            message: `getClinicController error: ${error.message}`,
            status: "notsuccess"
        });
    }
};


const updateClinicController = async (req, res) => {
    try {
        const { userID } = req.params;
        const { clinicname, address, contact, email, openingtime, closingtime, totalDoctors } = req.body;

        const getclinic = await Clinicmodel.findOne({ userID });
        if (!getclinic) {
            return res.status(404).send({ message: "Clinic profile not found", status: "notsuccess" });
        }

        const updateclinic = await Clinicmodel.findOneAndUpdate(
            { userID },
            { clinicname, address, contact, email, openingtime, closingtime, totalDoctors },
            { new: true }
        );

        return res.status(200).send({
            message: "Clinic profile updated successfully",
            status: "success",
            updateclinic
        });

    } catch (error) {
        return res.status(500).send({
            message: `updateClinicController error: ${error.message}`,
            status: "failed"
        });
    }
};


const updateDoctorStatus = async (req, res) => {
    try {
        const { doctorid, status } = req.body;

        const doctor = await Doctormodel.findByIdAndUpdate(
            doctorid,
            { status },
            { new: true }
        );

        if (!doctor) {
            return res.status(404).send({ message: "Doctor not found", status: "notsuccess" });
        }

        return res.status(200).send({
            message: `Doctor ${status} successfully`,
            status: "success",
            doctor
        });

    } catch (error) {
        return res.status(500).send({
            message: `updateDoctorStatus error: ${error.message}`,
            status: "failed"
        });
    }
};


export { addClinicController, getClinicController, updateClinicController, updateDoctorStatus };