import { body, validationResult } from "express-validator";

const handleValidationReqError = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateUserSignUpReq = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),

  body("address").isString().notEmpty().withMessage("Address must be a string"),

  body("phoneNumber").isString().notEmpty().withMessage("phone number required"),

  body("password").isString().notEmpty().withMessage("password must required"),

  handleValidationReqError,
];
