import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string = req.cookies?.token || req.body?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({
        message: "No token found in request"
      });
    }
    const validate: string | jwt.JwtPayload = jwt.verify(token, String(process.env.API_SECRET));
    next();
  } catch (err: any) {
    res.status(401).json({
      message: "Unauthorized or invalid token"
    });
  }
}
