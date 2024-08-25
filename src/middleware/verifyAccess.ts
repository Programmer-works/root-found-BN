
import Jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { errormessage } from "../utilies/errormessage";
import { NextFunction, Request, Response } from 'express';
interface UserPayload {
    user: {
        role: string;
        id: string;
    };
    admin: {
        role: string;
        id: string;
    };
}
declare module 'express' {
    interface Request {
        user?: UserPayload;
    }
}
const VerifyAccess = (passrole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["auth-token"];
        if (!token || Array.isArray(token)) {
            return errormessage(res, 401, `No valid token provided`);
        }
        const secretKey = process.env.SCRET_KY;
        if (!secretKey) {
            return errormessage(res, 500, `Secret key is not defined`);
        }
        try {
            const verifyToken = Jwt.verify(token, secretKey) as UserPayload;
            req.user = verifyToken;
            if (passrole !== verifyToken.user.role) {
                return errormessage(res, 404, `You don't have access`);
            } else {
                next();
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return errormessage(res, 401, `Token expired`);
            } else if (error instanceof JsonWebTokenError) {
                return errormessage(res, 401, `Invalid token`);
            }
             return errormessage(res, 500, `Server Error: ${(error as Error).message}`)
        }
    };
};
export default VerifyAccess;