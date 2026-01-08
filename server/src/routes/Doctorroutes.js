import express from "express"
import { addClinictoDoctor, addDoctorController, getaClinicslist, getDoctorController, updateDoctorController, updateDoctorimgController} from "../controllers/Doctorcontrollers.js"
import { upload } from "../middlewares/multer.js";


const doctorrouter=express.Router()

doctorrouter.post("/adddoctor",upload.fields([{name:"profileImage",maxCount:1},{name:"licenseImage",maxCount:1}]),addDoctorController);
doctorrouter.get("/getdoctor/:id",getDoctorController)
doctorrouter.patch("/updatedoctor/:userID",updateDoctorController)
doctorrouter.patch("/updatedoctorimg/:userID",upload.fields([{name:"profileImage",maxCount:1}]),updateDoctorimgController)
doctorrouter.get("/getclinicslist",getaClinicslist)
doctorrouter.post("/addtodoctor",addClinictoDoctor)



export default doctorrouter;