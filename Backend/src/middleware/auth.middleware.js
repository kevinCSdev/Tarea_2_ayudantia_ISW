import jwt from "jsonwebtoken";
import { handleErrorClient } from "../Handlers/responseHandlers.js";

export function authMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') return next();

    const authHeader = req.headers["authorization"];
    if (!authHeader) return handleErrorClient(res, 401, "No se encontró el token de autenticación");

    const token = authHeader.split(" ")[1];
    if (!token) return handleErrorClient(res, 401, "Token malformado");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // disponible para controladores
        next();
    } catch (error) {
        return handleErrorClient(res, 401, "Token inválido o expirado", error.message);
    }
}
