const Income = require("../models/Income");

// @route   GET /api/income
// @desc    Get all income entries for the logged-in user, with optional
//          search/filter/pagination via query params:
//          ?search=&source=&startDate=&endDate=&page=&limit=
// @access  Private
const getIncome = async (req, res, next) => {
  try {
    const { search, source, startDate, endDate, page = 1, limit = 20 } = req.query;

    const query = { userId: req.user._id };

    if (search) {
      query.note = { $regex: search, $options: "i" };
    }

    if (source && source !== "All") {
      query.source = source;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [income, total] = await Promise.all([
      Income.find(query).sort({ date: -1 }).skip(skip).limit(Number(limit)),
      Income.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: income.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/income
// @access  Private
const createIncome = async (req, res, next) => {
  try {
    const { source, amount, note, date } = req.body;

    const income = await Income.create({
      userId: req.user._id,
      source,
      amount,
      note,
      date: date || Date.now(),
    });

    res.status(201).json({ success: true, data: income });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/income/:id
// @access  Private
const updateIncome = async (req, res, next) => {
  try {
    let income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ success: false, message: "Income entry not found" });
    }

    if (income.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to modify this entry" });
    }

    income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: income });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/income/:id
// @access  Private
const deleteIncome = async (req, res, next) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ success: false, message: "Income entry not found" });
    }

    if (income.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this entry" });
    }

    await income.deleteOne();

    res.status(200).json({ success: true, message: "Income entry deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getIncome, createIncome, updateIncome, deleteIncome };
