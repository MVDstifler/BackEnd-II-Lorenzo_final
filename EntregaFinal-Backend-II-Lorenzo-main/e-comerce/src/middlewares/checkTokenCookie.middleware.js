import { userDao } from "../presistence/mongo/dao/user.dao.js";
import { verifyToken } from "../utils/jwt.js";


export const checkTokenCookie = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "No se provee Token" });

        const decoded = verifyToken(token);
        const user = await userDao.getOne({ _id: decoded._id });
        if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};