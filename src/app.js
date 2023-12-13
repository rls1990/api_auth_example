import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: true,
    url: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

// Routes
app.use("/api", userRoutes);

export default app;
