const { body, validationResult } = require("express-validator");

// Reusable validation chains
const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const expenseValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("amount").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
  body("category")
    .isIn([
      "Food",
      "Travel",
      "Shopping",
      "Bills",
      "Education",
      "Health",
      "Entertainment",
      "Others",
    ])
    .withMessage("Invalid category"),
  body("date").optional().isISO8601().withMessage("Invalid date"),
];

const incomeValidation = [
  body("source")
    .isIn(["Salary", "Freelancing", "Investments", "Others"])
    .withMessage("Invalid source"),
  body("amount").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
  body("date").optional().isISO8601().withMessage("Invalid date"),
];

// Middleware that checks validation results and returns 400 on failure
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
  expenseValidation,
  incomeValidation,
  validate,
};
