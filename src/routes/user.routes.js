import { Router } from "express";
import { authenticateToken, refreshAccessToken } from "../libs/jwt.js";
import { login, getUsers } from "../controller/user.controller.js";

const router = Router();

router.post("/login", login);

router.get("/users", authenticateToken, getUsers); // Ruta protegida

router.get("/refresh", refreshAccessToken);

export default router;
