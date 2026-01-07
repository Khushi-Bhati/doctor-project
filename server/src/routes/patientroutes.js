import express from "express"
import { addPatientController, getPatientController, updatePatientimgController, updatePatientController, updateInsuranceimgController, getaDoctorslist, getDoctorprofileByDoctorid, } from "../controllers/PatientController.js"
import { upload } from "../middlewares/multer.js"


const patientrouter = express.Router()

patientrouter.post("/addpatient",upload.fields([{name:"profileImage",maxCount:1},{name:"healthinsurance",maxCount:1}]),addPatientController)
patientrouter.get("/getpatient/:id",getPatientController)
patientrouter.patch("/updatepatient/:userID",updatePatientController)
patientrouter.patch("/updatepatientimg/:userID",upload.fields([{name:"profileImage",maxCount:1}]),updatePatientimgController)
patientrouter.patch("/updateinsuranceimg/:userID",upload.fields([{name:"healthinsurance",maxCount:1}]),updateInsuranceimgController)
patientrouter.get("/getdoctorslist",getaDoctorslist)
patientrouter.get("/viewProfileBydoctorid/:id",getDoctorprofileByDoctorid)

export default patientrouter

