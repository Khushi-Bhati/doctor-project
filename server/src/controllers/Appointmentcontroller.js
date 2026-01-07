import { Appointemtmodel } from "../models/Appointmentmodel.js";

const bookappointmentcontroller = async (req, res) => {
    try {

        const { PatientId, DoctorId, ClinicId, bookingDate, bookingTime } = req.body;

        if ([PatientId, DoctorId, ClinicId, bookingDate, bookingTime].some((field) => {
            field.trim() === ""
        })) {
            res.status(200).send(
                {
                    message: "All fields are required",
                    status: "notsuccess"
                }
            )
        }


        const existingbooking = await Appointemtmodel.findOne(
            {
                PatientId,
                bookingDate,
                ClinicId,
            }
        )

        if (existingbooking) {
            res.status(200).send(
                {
                    message: "Already booked",
                    status: "notsuccess"
                }
            )
        }


        const booking = await Appointemtmodel.create(
            {
                PatientId, DoctorId, ClinicId, bookingDate, bookingTime
            }
        )


        res.status(200).send(
            {
                message: "Booked successfully",
                status: "success",
                booking
            }
        )

    } catch (error) {
        res.status(500).send(
            {
                message: `bookingcontroller error ${error}`,
                status: "notsuccess"
            }
        )

    }
}

const cancelledappointment = async (req, res) => {


    try {

        const { PatientId, DoctorId, ClinicId, bookingDate, bookingTime } = req.body;



        const existingbooking = await Appointemtmodel.findOne(
            {
                PatientId,
                bookingDate,
                ClinicId,
                DoctorId,
                bookingTime
            }
        )
        if (!existingbooking) {
            res.status(200).send({
                message: "booking not found",
                status: "notsuccess"
            })
        }



        const updatebooking = await Appointemtmodel.findOneAndUpdate(existingbooking._id, { bookingStatus: "cancelled" }, { new: true })
        res.status(200).send(
            {
                message: "cancelled appointment  successfully",
                status: "success",
                updatebooking


            }
        )


    } catch (error) {
        res.status(500).send(
            {
                message: "booking status not cancelled",
                status: "failed",
                error

            }
        )

    }
}

const completedappointment = async (req, res) => {


    try {

        const { PatientId, DoctorId, ClinicId, bookingDate, bookingTime } = req.body;



        const existingbooking = await Appointemtmodel.findOne(
            {
                PatientId,
                bookingDate,
                ClinicId,
                DoctorId,
                bookingTime
            }
        )
        if (!existingbooking) {
            res.status(200).send({
                message: "booking not found",
                status: "notsuccess"
            })
        }



        const updatebooking = await Appointemtmodel.findOneAndUpdate(existingbooking._id, { bookingStatus: "completed" }, { new: true })
        res.status(200).send(
            {
                message: "completed appointment  successfully",
                status: "success",
                updatebooking


            }
        )


    } catch (error) {
        res.status(500).send(
            {
                message: "booking status not cancelled",
                status: "failed",
                error

            }
        )

    }
}


export { bookappointmentcontroller, cancelledappointment,completedappointment }