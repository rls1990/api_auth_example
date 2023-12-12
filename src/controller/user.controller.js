import {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
} from "../libs/jwt.js";
import bcript from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const passwordHash = await bcript.hash(password, 10);

    const user = {
      id: 1,
      email: "usuario@example.com",
      password: "$2b$10$rwJocYsoVGgX/wk4HekRPubw9i0XjbW6jwjACdN6qPZUH4mjdvmhy", // Contraseña encriptada
    };

    const isMatch = await bcript.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // La contraseña es correcta, se puede generar el token de acceso
    const accessToken = generateAccessToken({ id: user.id });

    // También se puede generar el token de actualización (opcional)
    const refreshToken = generateRefreshToken({ id: user.id });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Credenciales inválidas" });
  }
};

export const getUsers = (req, res) => {
  try {
    // Acceso a la ruta protegida solo si el token de acceso es válido
    res.json({
      message: "Has accedido a una ruta protegida",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Credenciales inválidas" });
  }
};
