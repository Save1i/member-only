import { body } from "express-validator";

const validateUser = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("nickName").notEmpty().withMessage("Nickname is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 10 characters"),
];

export default {
    validateUser,
}
