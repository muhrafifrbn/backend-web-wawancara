import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import studentRoutes from "./src/routes/studentRoutes.js";
import parentRoutes from "./src/routes/parentRoutes.js";
import medicalRoutes from "./src/routes/medicalRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import dashboardRouter from "./src/routes/dashboardRouter.js";
import loggingRouter from "./src/routes/logRouter.js";
import indexRoutes from "./src/routes/indexRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import registrationRoutes from "./src/routes/registrationRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/students", studentRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/medical", medicalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/logging", loggingRouter);
app.use("/api/user", userRoutes);
app.use("/api/registration", registrationRoutes);
app.use(indexRoutes);

const PORT = process.env.PORT || 5500;
// app.listen(PORT, () => {
//   console.log(`Server running on port http://localhost:${PORT}`);
// });
app.listen(PORT, "localhost", () => {
  //change the ip add on your host ip (use i>
  console.log(`Server running on port  localhost:${PORT}`);
});
