import { isValidObjectId, Types } from "mongoose";

import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

// Dashboard Data
export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Validate user ID
        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);

        // Fetch total expense
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);

        // Get income transactions in the last 60 days
        const last60daysIncomeTransaction = await Income.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            },
        }).sort({ date: -1 });

        // Total income in the last 60 days
        const incomeLast60days = last60daysIncomeTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions in the last 30 days
        const last30daysExpenseTransaction = await Expense.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
        }).sort({ date: -1 });

        // Total expense in the last 30 days
        const expenseLast30days = last30daysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch recent income transactions
        const recentIncome = await Income.find({ userId });

        // Fetch recent expense transactions
        const recentExpenses = await Expense.find({ userId });

        // Merge and sort transactions
        const lastTransactions = [
            ...recentIncome.map((txn) => ({
                ...txn.toObject(),
                type: "income",
            })),

            ...recentExpenses.map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        // Final response
        res.status(200).json({
            totalBalance:
                (totalIncome[0]?.total || 0) -
                (totalExpense[0]?.total || 0),

            totalIncome: totalIncome[0]?.total || 0,

            totalExpense: totalExpense[0]?.total || 0,

            last30DaysExpense: {
                total: expenseLast30days,
                transaction: last30daysExpenseTransaction,
            },

            last60DaysIncome: {
                total: incomeLast60days,
                transaction: last60daysIncomeTransaction,
            },

            recentTransactions: lastTransactions,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error loading dashboard.",
            error: err.message,
        });
    }
};