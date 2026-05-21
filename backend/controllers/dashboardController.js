import { isValidObjectId, Types } from "mongoose";

import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

// Dashboard Data
export const getDashboardData = async (req, res) => {
    try {

        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // validate user
        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        // Fetch total income and expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        console.log("total user income", { totalIncome, userId: isValidObjectId(userId) });

    } catch (err) {
        res.status(500).json({
            message: "Error loading dashboard.",
            error: err.message,
        });
    }
};