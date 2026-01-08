import express from "express"
import { bookappointmentcontroller, cancelledappointment, completedappointment } from "../controllers/Appointmentcontroller.js"


const appointmentrouter = express.Router()

appointmentrouter.post("/bookappointment",bookappointmentcontroller)
appointmentrouter.patch("/cancelappointment",cancelledappointment)
appointmentrouter.patch("/completeappointment",completedappointment)

export default appointmentrouter;