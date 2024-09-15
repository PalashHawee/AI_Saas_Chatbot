import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
//login validations
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Please enter a valid email"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator
];
//# sourceMappingURL=validators.js.map