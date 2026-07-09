const Expense = require("../models/Expense");
const Income = require("../models/Income");

// @route   GET /api/reports/summary
// @desc    Aggregated totals used by the Dashboard: total income, total
//          expenses, balance, and the 5 most recent transactions.
// @access  Private
const getSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [incomeAgg] = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const [expenseAgg] = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = incomeAgg?.total || 0;
    const totalExpenses = expenseAgg?.total || 0;

    const recentExpenses = await Expense.find({ userId }).sort({ date: -1 }).limit(5);
    const recentIncome = await Income.find({ userId }).sort({ date: -1 }).limit(5);

    const recentTransactions = [...recentExpenses.map((e) => ({ ...e.toObject(), type: "expense" })),
      ...recentIncome.map((i) => ({ ...i.toObject(), type: "income" }))]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        recentTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/reports/monthly?year=2026
// @desc    Monthly totals (income vs expenses) for a given year, for bar/line charts
// @access  Private
const getMonthlyReport = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const year = Number(req.query.year) || new Date().getFullYear();
    const start = new Date(`${year}-01-01T00:00:00.000Z`);
    const end = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    const expenseByMonth = await Expense.aggregate([
      { $match: { userId, date: { $gte: start, $lt: end } } },
      { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } },
    ]);

    const incomeByMonth = await Income.aggregate([
      { $match: { userId, date: { $gte: start, $lt: end } } },
      { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } },
    ]);

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expenses: 0,
    }));

    incomeByMonth.forEach((entry) => {
      months[entry._id - 1].income = entry.total;
    });
    expenseByMonth.forEach((entry) => {
      months[entry._id - 1].expenses = entry.total;
    });

    res.status(200).json({ success: true, year, data: months });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/reports/by-category
// @desc    Expense totals grouped by category, for the pie chart
// @access  Private
const getCategoryReport = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const byCategory = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: byCategory.map((c) => ({ category: c._id, total: c.total })),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSummary, getMonthlyReport, getCategoryReport };
