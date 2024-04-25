import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { adminUser, secretKey, tokenExxpiration } from "../../config/config";

export const loginUser = (request: Request, response: Response) => {
    const { username, password } = request.body;

    if(adminUser.username === username && adminUser.password === password) {
        const token = jwt.sign({username: adminUser.username}, secretKey, { expiresIn : tokenExxpiration});
        response.json({ token });
    } else {
        response.status(401).json({ message : "Invalid User" })
    }
};