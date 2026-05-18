import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        icon: {
            type: String,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
            min: [1, "Amount must be greater than 0"],
        },

        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;