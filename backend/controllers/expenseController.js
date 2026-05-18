import xlsx from "xlsx";

import Expense from "../models/Expense.js";

// Add Expenses
export const addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation
        if (!category || amount == null) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: date ? new Date(date) : new Date(),
        });

        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({
            message: "Error adding expense",
            error: err.message,
        });
    }
};

// Get All Expenses
export const getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching expenses",
            error: err.message,
        });
    }
};

// Delete Expenses
export const deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        // Check if expense exists
        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully",
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting expense",
            error: err.message,
        });
    }
};

// Download Expense Excel
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        // Format data for Excel
        const data = expenses.map((expense) => ({
            Category: expense.category,
            Amount: expense.amount,
            Date: expense.date.toLocaleDateString(),
        }));

        // Create workbook
        const workbook = xlsx.utils.book_new();
        // Create worksheet
        const worksheet = xlsx.utils.json_to_sheet(data);
        // Append worksheet
        xlsx.utils.book_append_sheet(workbook, worksheet, "Expenses");

        xlsx.writeFile(workbook, "expense_details.xlsx");

        res.download("expense_details.xlsx")

    } catch (err) {
        res.status(500).json({
            message: "Error downloading expense excel",
            error: err.message,
        });
    }
};