const express = require("express");
const router = express.Router();
const {
  getSummary,
  getMonthlyReport,
  getCategoryReport,
} = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/summary", getSummary);
router.get("/monthly", getMonthlyReport);
router.get("/by-category", getCategoryReport);

module.exports = router;
