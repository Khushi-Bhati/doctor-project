import { Appointemtmodel } from "../models/Appointmentmodel.js";

const bookappointmentcontroller = async (req, res) => {
    try {
        const { PatientId, DoctorId, ClinicId, bookingDate, bookingTime } = req.body;

        if ([PatientId, DoctorId, ClinicId, bookingDate, bookingTime].some((field) => !field || field.toString().trim() === "")) {
            return res.status(400).send({ message: "All fields are required", status: "notsuccess" });
        }

        const existingbooking = await Appointemtmodel.findOne({ PatientId, bookingDate, ClinicId });
        if (existingbooking) {
            return res.status(200).send({ message: "Already booked", status: "notsuccess" });
        }

        const booking = await Appointemtmodel.create({ PatientId, DoctorId, ClinicId, bookingDate, bookingTime });

        return res.status(200).send({ message: "Booked successfully", status: "success", booking });

    } catch (error) {
        return res.status(500).send({
            message: `bookAppointmentController error: ${error.message}`,
            status: "notsuccess"
        });
    }
};


const cancelledappointment = async (req, res) => {
    try {
        const { PatientId, DoctorId, ClinicId, bookingDate, bookingTime } = req.body;

        const existingbooking = await Appointemtmodel.findOne({ PatientId, bookingDate, ClinicId, DoctorId, bookingTime });
        if (!existingbooking) {
            return res.status(404).send({ message: "Booking not found", status: "notsuccess" });
        }

        const updatebooking = await Appointemtmodel.findByIdAndUpdate(
            existingbooking._id,
            { bookingStatus: "cancelled" },
            { new: true }
        );

        return res.status(200).send({ message: "Appointment cancelled successfully", status: "success", updatebooking });

    } catch (error) {
        return res.status(500).send({
            message: `cancelledappointment error: ${error.message}`,
            status: "failed"
        });
    }
};


const completedappointment = async (req, res) => {
    try {
        const { PatientId, DoctorId, ClinicId, bookingDate, bookingTime } = req.body;

        const existingbooking = await Appointemtmodel.findOne({ PatientId, bookingDate, ClinicId, DoctorId, bookingTime });
        if (!existingbooking) {
            return res.status(404).send({ message: "Booking not found", status: "notsuccess" });
        }

        const updatebooking = await Appointemtmodel.findByIdAndUpdate(
            existingbooking._id,
            { bookingStatus: "completed" },
            { new: true }
        );

        return res.status(200).send({ message: "Appointment completed successfully", status: "success", updatebooking });

    } catch (error) {
        return res.status(500).send({
            message: `completedappointment error: ${error.message}`,
            status: "failed"
        });
    }
};


export { bookappointmentcontroller, cancelledappointment, completedappointment };