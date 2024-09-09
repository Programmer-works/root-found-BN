import { check, validationResult } from "express-validator";
import errormessage from "../utils/errorMessage";

class validator {
    static inputvalidator(req, res, next) {
        const errors = validationResult(req);

        // Check if there are validation errors
        if (!errors.isEmpty()) {
            // Collect all error messages into an array
            const errorMessages = errors.errors.map(error => error.msg);
            
            // Send a response with the array of error messages
            return errormessage(res, 401, errorMessages);
        }

        // If no errors, move to the next middleware
        return next();
    }

    static userAccountRule() {
        return [
            check("userName", "Please write your username correctly").trim().isString(),
            check("email", "Please write your email correctly").trim().isEmail(),
            check("password", "Please make a stronger password").trim().isStrongPassword(),
            check("course", "Please enter the course correctly").trim().isString(),
        ];
    }
}

export default validator;
