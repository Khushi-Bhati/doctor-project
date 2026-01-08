import express from "express";
import userrouter from "./routes/Userroutes.js";
import doctorrouter from "./routes/Doctorroutes.js";
import cors from "cors"
import patientrouter from "./routes/patientroutes.js";
import clinicrouter from "./routes/Clinicroutes.js";
import appointmentrouter from "./routes/Appointment.js";

const app=express();

app.use(cors({
    origin:"http://localhost:8000"

}))

app.use(express.json())

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))


app.use("/Hospital/doctor",doctorrouter);
app.use("/Hospital/user",userrouter);
app.use("/Hospital/patient",patientrouter)
app.use("/Hospital/clinic",clinicrouter)
app.use("/Hospital/appointment",appointmentrouter)




// http://localhost:8000/Hospital/user/register



export {app}