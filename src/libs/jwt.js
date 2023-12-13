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
  const authorization = req.headers["authorization"].split(" ");
  const token_type = authorization[0]; //Bearer: para indicar que es un token de acceso
  const accessToken = authorization[1];

  if (!accessToken || token_type !== "Bearer")
    return res
      .status(401)
      .json({ message: "Sin token de acceso, no autorizado" }); // Sin token de acceso, no autorizado

  jwt.verify(accessToken, ACCESS_TOKEN_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Token de acceso inválido o vencido" }); // Token de acceso inválido o vencido
    req.user = user;
    next(); // Pasar al siguiente middleware
  });
};

export const refreshAccessToken = (req, res) => {
  const authorization = req.headers["authorization"].split(" ");
  const token_type = authorization[0]; //Token: para indicar que es un token de actualización
  const refreshToken = authorization[1];

  if (!refreshToken || token_type !== "Token")
    return res
      .status(401)
      .json({ message: "Sin token de actualización, no autorizado" }); // Sin token de actualización, no autorizado

  jwt.verify(refreshToken, REFRESH_TOKEN_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Token de actualización inválido o vencido" }); // Token de actualización inválido o vencido
    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_KEY, {
      expiresIn: "5m", // Generar un nuevo token de acceso válido por 5 minutos
    });
    res.json({ accessToken, user });
  });
};
