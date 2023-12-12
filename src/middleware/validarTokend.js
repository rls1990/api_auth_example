import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const autentificacionRequerida = (req, res, next) => {
  //const { token } = req.cookies;
  //const { authorization: token } = req.headers;
  const { token } = req.body;

  if (!token)
    return res.status(401).json({
      message: "No hay tokend, autorización denegada.",
    });

  jwt.verify(token, TOKEN_SECRET, (err, token_decode) => {
    if (err) return res.status(403).json({ message: "Token Inválido" });
    req.user = token_decode;
    next();
  });
};
