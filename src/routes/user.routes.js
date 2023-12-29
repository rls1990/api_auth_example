import { Router } from "express";
import {
  authRequired,
  refreshAccessToken,
} from "../middleware/auth.middleware.js";
import {
  login,
  getUsers,
  verify,
  refresh,
} from "../controller/user.controller.js";

const router = Router();

router.post("/login", login);

router.get("/users", authRequired, getUsers); // Ruta protegida

router.get("/verify", authRequired, verify); // Ruta protegida

router.get("/refresh", refreshAccessToken, refresh);

export default router;
