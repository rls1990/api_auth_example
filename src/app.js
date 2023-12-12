import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api", userRoutes);

export default app;
