import xlsx from "xlsx";

import Income from "../models/Income.js";

// Add Income Source
export const addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation
        if (!source || !amount || !date) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: date ? new Date(date) : new Date(),
        });

        await newIncome.save();

        res.status(201).json(newIncome);
    } catch (err) {
        res.status(500).json({
            message: "Error adding income",
            error: err.message,
        });
    }
};

// Get All Income Sources
export const getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        res.status(200).json(incomes);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching incomes",
            error: err.message,
        });
    }
};

// Delete Income Source
export const deleteIncome = async (req, res) => {
    try {
        const deletedIncome = await Income.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        // Check if income exists
        if (!deletedIncome) {
            return res.status(404).json({
                message: "Income source not found",
            });
        }

        res.status(200).json({
            message: "Income source deleted successfully",
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting income source",
            error: err.message,
        });
    }
};

// Download Income Excel
export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Format data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toLocaleDateString(),
        }));

        // Create workbook
        const workbook = xlsx.utils.book_new();
        // Create worksheet
        const worksheet = xlsx.utils.json_to_sheet(data);
        // Append worksheet
        xlsx.utils.book_append_sheet(workbook, worksheet, "Income");

        xlsx.writeFile(workbook, "income_details.xlsx");

        res.download("income_details.xlsx")

    } catch (err) {
        res.status(500).json({
            message: "Error downloading income excel",
            error: err.message,
        });
    }
};