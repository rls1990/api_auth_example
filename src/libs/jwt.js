import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../config.js";

export const generateAccessToken = (user) => {
  const accessToken = jwt.sign(user, ACCESS_TOKEN_KEY, {
    expiresIn: "5m", // Generar un nuevo token de acceso válido por 5 minutos
  });
  return accessToken;
};

export const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_KEY, {
    expiresIn: "1d", // Generar un nuevo token de acceso válido por 1 día
  });
  return refreshToken;
};

export const authenticateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"].split(" ")[1];

  if (!accessToken)
    return res
      .status(401)
      .json({ message: "Sin token de acceso, no autorizado" }); // Sin token de acceso, no autorizado

  jwt.verify(accessToken, ACCESS_TOKEN_KEY, (err, user) => {
    if (err)
      res.status(401).json({ message: "Sin token de acceso, no autorizado" }); // Token de acceso inválido o vencido
    req.user = user;
    next(); // Pasar al siguiente middleware
  });
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.headers["authorization"].split(" ")[1];

  if (!refreshToken) return res.sendStatus(401); // Sin token de actualización, no autorizado

  jwt.verify(refreshToken, REFRESH_TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Token de actualización inválido o vencido
    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_KEY, {
      expiresIn: "5m", // Generar un nuevo token de acceso válido por 5 minutos
    });
    res.json({ accessToken });
  });
};
