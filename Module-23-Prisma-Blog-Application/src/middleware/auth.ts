import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth.js";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const auth = (...roles: UserRole[]) => {
  try {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number;
        email: string;
      };

      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.user = decoded as any;

      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });
      console.log(session);
      if (!session) {
        return res
          .status(401)
          .json({ success: false, message: "You are not Authorized!" });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required, Please verify your email.",
        });
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };
      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You don't have permission to access this resources!",
        });
      }
      next();
    };
  } catch (error) {
    console.error(error);
    return (req: Request, res: Response) => {
      res.status(500).json({ error: "Internal Server Error" });
    };
  }
};
