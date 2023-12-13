import {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
} from "../libs/jwt.js";
import bcript from "bcrypt";

export const login = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    //const passwordHash = await bcript.hash(password, 10);

    const user = {
      id: 1,
      nombre: "admin",
      password: "$2b$10$Njnci2DplDbIULc0x1DOjuDZ0d1HLTxNAIiAIHw.6U4DKgl9xXROy", // contraseña:admin123
    };

    const isMatch = bcript.compare(password, user.password);

    if (!isMatch || nombre !== user.nombre) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Las credenciales son correctas, se puede generar el token de acceso y el token de actualización
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.json({ accessToken, refreshToken, user: { id: user.id } });
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

export const verify = (req, res) => {
  try {
    // Acceso a la ruta protegida solo si el token de acceso es válido
    res.json({
      message: "Token de acceso verificado",
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Credenciales inválidas" });
  }
};
