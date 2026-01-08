import express from "express";
import userrouter from "./routes/Userroutes.js";
import doctorrouter from "./routes/Doctorroutes.js";
import cors from "cors"
import patientrouter from "./routes/patientroutes.js";
import clinicrouter from "./routes/Clinicroutes.js";
import appointmentrouter from "./routes/Appointment.js";

const app=express();

app.use(cors({
    origin:"https://doctor-frontend-project-3.onrender.com"

}))

app.use(express.json())

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))


app.use("/Hospital/doctor",doctorrouter);
app.use("/Hospital/user",userrouter);
app.use("/Hospital/patient",patientrouter)
app.use("/Hospital/clinic",clinicrouter)
app.use("/Hospital/appointment",appointmentrouter)

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital API is running successfully 🚀"
  });
});




// http://localhost:8000/Hospital/user/register



export {app}
