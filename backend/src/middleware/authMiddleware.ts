import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest
  extends Request {
  userId?: number;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      userId: number;
    };

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}