import { Clinicmodel } from "../models/Clinicmodel.js";
import { Doctormodel } from "../models/Doctormodel.js";
import { Usermodel } from "../models/Usermodel.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";

const addDoctorController = async (req, res) => {
    try {
        const { doctorname, speciality, degree, experience, gender, alternateNo, address, city, state, pincode, userID } = req.body;

        if ([doctorname, speciality, degree, experience, gender, alternateNo, address, city, state, pincode, userID].some(field => !field || field.trim() === "")) {
            return res.status(400).send({ message: "All fields are required", status: "notsuccess" });
        }

        const doctorprofileimagelocalpath = req.files?.profileImage?.[0]?.path;
        const licenselocalpath = req.files?.licenseImage?.[0]?.path;

        if (!doctorprofileimagelocalpath) {
            return res.status(400).send({ message: "Profile image is required", status: "notsuccess" });
        }

        if (!licenselocalpath) {
            return res.status(400).send({ message: "License image is required", status: "notsuccess" });
        }

        const doctorprofileimage = await uploadoncloudinary(doctorprofileimagelocalpath);
        const licenseimage = await uploadoncloudinary(licenselocalpath);

        if (!doctorprofileimage || !doctorprofileimage.url) {
            return res.status(500).send({ message: "Profile image upload failed", status: "notsuccess" });
        }

        if (!licenseimage || !licenseimage.url) {
            return res.status(500).send({ message: "License image upload failed", status: "notsuccess" });
        }

        const existingdoctor = await Doctormodel.findOne({ userID });
        if (existingdoctor) {
            return res.status(200).send({ message: "Profile already created", status: "notsuccess" });
        }

        const doctor = await Doctormodel.create({
            doctorname, speciality, licenseImage: licenseimage.url,
            address, city, state, pincode, degree, experience,
            gender, alternateNo, userID, profileImage: doctorprofileimage.url
        });

        await Usermodel.findByIdAndUpdate(userID, { isprofilecreated: true });

        return res.status(200).send({
            message: "Profile created successfully",
            status: "success",
            doctor,
            doctorid: doctor._id
        });

    } catch (error) {
        return res.status(500).send({
            message: `addDoctorController error: ${error.message}`,
            status: "notsuccess"
        });
    }
};


const getDoctorController = async (req, res) => {
    try {
        const userID = req.params.id;
        const existingdoctor = await Doctormodel.findOne({ userID }).populate("userID").populate("clinics");

        if (!existingdoctor) {
            return res.status(404).send({ message: "Doctor not found", status: "notsuccess" });
        }

        return res.status(200).send({
            message: "Profile fetched successfully",
            status: "success",
            existingdoctor
        });

    } catch (error) {
        return res.status(500).send({
            message: `getDoctorController error: ${error.message}`,
            status: "notsuccess"
        });
    }
};


const updateDoctorController = async (req, res) => {
    try {
        const { userID } = req.params;
        const { doctorname, speciality, degree, experience, gender, alternateNo } = req.body;

        const getdoctor = await Doctormodel.findOne({ userID });
        if (!getdoctor) {
            return res.status(404).send({ message: "Doctor profile not found", status: "notsuccess" });
        }

        const updatedoctor = await Doctormodel.findOneAndUpdate(
            { userID },
            { doctorname, speciality, degree, experience, gender, alternateNo },
            { new: true }
        );

        return res.status(200).send({
            message: "Doctor profile updated successfully",
            status: "success",
            updatedoctor
        });

    } catch (error) {
        return res.status(500).send({
            message: `updateDoctorController error: ${error.message}`,
            status: "failed"
        });
    }
};


const updateDoctorimgController = async (req, res) => {
    try {
        const { userID } = req.params;
        const doctorprofileimagefilelocalpath = req.files?.profileImage?.[0]?.path;

        if (!doctorprofileimagefilelocalpath) {
            return res.status(400).send({ message: "Profile image is required", status: "notsuccess" });
        }

        const doctorprofileimage = await uploadoncloudinary(doctorprofileimagefilelocalpath);

        if (!doctorprofileimage || !doctorprofileimage.url) {
            return res.status(500).send({ message: "Image upload failed", status: "notsuccess" });
        }

        const getdoctor = await Doctormodel.findOne({ userID });
        if (!getdoctor) {
            return res.status(404).send({ message: "Doctor profile not found", status: "notsuccess" });
        }

        const updatedoctorimg = await Doctormodel.findOneAndUpdate(
            { userID },
            { profileImage: doctorprofileimage.url },
            { new: true }
        );

        return res.status(200).send({
            message: "Doctor image updated successfully",
            status: "success",
            updatedoctorimg
        });

    } catch (error) {
        return res.status(500).send({
            message: `updateDoctorimgController error: ${error.message}`,
            status: "failed"
        });
    }
};


const getaClinicslist = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const pageskip = (page - 1) * limit;

        const clinics = await Clinicmodel.find().skip(pageskip).limit(limit);
        const total = await Clinicmodel.countDocuments();

        return res.status(200).send({
            status: "success",
            totalpages: Math.ceil(total / limit),
            currentpage: page,
            totalrecords: total,
            clinics
        });

    } catch (error) {
        return res.status(500).send({
            message: `getaClinicslist error: ${error.message}`,
            status: "notsuccess"
        });
    }
};


const addClinictoDoctor = async (req, res) => {
    try {
        const { doctorid, clinicid } = req.body;

        await Doctormodel.findByIdAndUpdate(
            doctorid,
            { $addToSet: { clinics: clinicid } },
            { new: true }
        );

        return res.status(200).send({ message: "Clinic added successfully", status: "success" });

    } catch (error) {
        return res.status(500).send({
            message: `addClinictoDoctor error: ${error.message}`,
            status: "failed"
        });
    }
};


export { addDoctorController, getDoctorController, updateDoctorController, updateDoctorimgController, getaClinicslist, addClinictoDoctor };
