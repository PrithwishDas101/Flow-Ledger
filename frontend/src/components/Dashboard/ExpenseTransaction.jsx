import { LuArrowBigRight } from "react-icons/lu";
import moment from "moment";

import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx"

const ExpenseTransaction = ({transactions, onSeeMore}) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between ">
            <h5 className="text-lg font-medium">Expense</h5>

            <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowBigRight className="text-base" />
            </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(-5).map((expense) => (
                <TransactionInfoCard 
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseTransaction