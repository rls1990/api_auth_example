import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../config/config.js";

export const authRequired = (req, res, next) => {
  const authorization = req.headers["authorization"].split(" ");
  //token_type = Bearer: para indicar que es un token de acceso
  const token_type = authorization[0];
  const accessToken = authorization[1];

  if (!accessToken || token_type !== "Bearer")
    return res
      .status(401)
      .json({ message: "Sin token de acceso, no autorizado" });
  //verificar el token de acceso
  jwt.verify(accessToken, ACCESS_TOKEN_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Token de acceso inválido o vencido" });

    req.user = user;
    next(); // Pasar al siguiente middleware
  });
};

export const refreshAccessToken = (req, res, next) => {
  const authorization = req.headers["authorization"].split(" ");
  //token_type: Token para indicar que es un token de actualización
  const token_type = authorization[0];
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
    req.accessToken = accessToken;
    req.user = user;
    next();
  });
};
