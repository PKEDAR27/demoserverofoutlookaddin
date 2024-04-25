import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../../config/config";

export const authenticateJWT = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;

    if(!token) {
        return response.status(401).json({ message: "Unauthrized" });
    }

    jwt.verify(token, secretKey, (error, decoded) => {
        if(error) {
            return response.status(403).json({ message: "Forbidden" });
        }

        request.body.user = decoded;
        next();
    })
};