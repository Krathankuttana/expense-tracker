const express = require("express");
const router = express.Router();
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");
const { expenseValidation, validate } = require("../utils/validators");

router.use(protect); // every route below requires authentication

router.route("/")
  .get(getExpenses)
  .post(expenseValidation, validate, createExpense);

router.route("/:id")
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
