import express from "express"
import {addClinicController, getClinicController, updateClinicController, updateDoctorStatus } from "../controllers/Cliniccontroller.js"
import { upload } from "../middlewares/multer.js"

const clinicrouter = express.Router()

clinicrouter.post("/addclinic",upload.fields([{name:"clinicImages",maxCount:4}]),addClinicController)
clinicrouter.get("/getclinic/:id",getClinicController)
clinicrouter.patch("/updateclinic/:userID",updateClinicController)
clinicrouter.patch("/approveddoctors",updateDoctorStatus)

export default clinicrouter
