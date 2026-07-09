const express = require("express");
const router = express.Router();
const {
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");
const { incomeValidation, validate } = require("../utils/validators");

router.use(protect);

router.route("/")
  .get(getIncome)
  .post(incomeValidation, validate, createIncome);

router.route("/:id")
  .put(updateIncome)
  .delete(deleteIncome);

module.exports = router;
