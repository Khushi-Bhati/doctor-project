import { Doctormodel } from "../models/Doctormodel.js";
import { Patientmodel } from "../models/Patientmodel.js";
import { Usermodel } from "../models/Usermodel.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";

/* ================= ADD PATIENT ================= */
const addPatientController = async (req, res) => {
  try {
    const {
      patientname,
      gender,
      DOB,
      bloodgroup,
      height,
      weight,
      injuries,
      familymedicalhistory,
      exerciseroutine,
      alcohol,
      smoking,
      allergies,
      address,
      alternateNo,
      userID
    } = req.body;

    if (
      [
        patientname,
        gender,
        DOB,
        bloodgroup,
        height,
        weight,
        injuries,
        familymedicalhistory,
        exerciseroutine,
        alcohol,
        smoking,
        allergies,
        address,
        alternateNo,
        userID
      ].some(field => !field || field.toString().trim() === "")
    ) {
      return res.status(400).send({
        message: "All fields are required",
        status: "notsuccess"
      });
    }

    const profilePath = req.files?.profileImage?.[0]?.path;
    const insurancePath = req.files?.healthinsurance?.[0]?.path;

    if (!profilePath || !insurancePath) {
      return res.status(400).send({
        message: "Profile image and insurance image are required",
        status: "notsuccess"
      });
    }

    const profileImage = await uploadoncloudinary(profilePath);
    const insuranceImage = await uploadoncloudinary(insurancePath);

    const existingPatient = await Patientmodel.findOne({ userID });
    if (existingPatient) {
      return res.status(400).send({
        message: "Patient already exists",
        status: "notsuccess"
      });
    }

    const patient = await Patientmodel.create({
      patientname,
      gender,
      DOB,
      bloodgroup,
      height,
      weight,
      injuries,
      familymedicalhistory,
      exerciseroutine,
      alcohol,
      smoking,
      allergies,
      address,
      alternateNo,
      userID,
      profileImage: profileImage.url,
      healthinsurance: insuranceImage.url
    });

    await Usermodel.findByIdAndUpdate(userID, { isprofilecreated: true });

    return res.status(201).send({
      message: "Patient profile created successfully",
      status: "success",
      patient,
      patientid: patient._id
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message,
      status: "failed"
    });
  }
};

/* ================= GET PATIENT ================= */
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

    return res.status(200).send({
      message: "Profile fetched successfully",
      status: "success",
existingPatient
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message,
      status: "failed"
    });
  }
};

/* ================= UPDATE PATIENT ================= */
const updatePatientController = async (req, res) => {
  try {
    const { userID } = req.params;

    const updatedPatient = await Patientmodel.findOneAndUpdate(
      { userID },
      req.body,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).send({
        message: "Patient not found",
        status: "notsuccess"
      });
    }

    return res.status(200).send({
      message: "Patient profile updated successfully",
      status: "success",
      updatedPatient
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message,
      status: "failed"
    });
  }
};

/* ================= GET DOCTORS LIST ================= */
const getaDoctorslist = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      doctorname,
      speciality,
      status
    } = req.query;

    const skip = (page - 1) * limit;
    const filter = {};

    if (doctorname)
      filter.doctorname = { $regex: doctorname, $options: "i" };

    if (speciality)
      filter.speciality = { $regex: speciality, $options: "i" };

    if (status)
      filter.status = status;

    const doctors = await Doctormodel.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .populate("userID")
      .populate("clinics");

    const total = await Doctormodel.countDocuments(filter);

    return res.status(200).send({
      status: "success",
      totalrecords: total,
      totalpages: Math.ceil(total / limit),
      currentpage: Number(page),
      doctors
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message,
      status: "failed"
    });
  }
};

/* ================= GET DOCTOR BY ID ================= */
const getDoctorprofileByDoctorid = async (req, res) => {
  try {
    const doctorID = req.params.id;

    const doctor = await Doctormodel.findById(doctorID)
      .populate("userID")
      .populate("clinics");

    if (!doctor) {
      return res.status(404).send({
        message: "Doctor not found",
        status: "notsuccess"
      });
    }

    return res.status(200).send({
      message: "Profile fetched successfully",
      status: "success",
      doctor
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message,
      status: "failed"
    });
  }
};

/* ================= EXPORT ================= */
export {
  addPatientController,
  getPatientController,
  updatePatientController,
  getaDoctorslist,
  getDoctorprofileByDoctorid
};


