const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create transaction
router.post("/", async (req, res) => {
  try {
    const { description, amount, type, category, date } = req.body;

    if (!description || !amount || !type || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTransaction = new Transaction({
      description,
      amount,
      type,
      category,
      date,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// DELETE transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE transaction
router.put("/:id", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// GET summary
router.get("/summary", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
