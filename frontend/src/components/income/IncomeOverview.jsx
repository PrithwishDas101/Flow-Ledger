import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import CustomBarChart from "../Charts/CustomBarChart.jsx";
import { prepareIncomeBarChartData } from "../../utils/helper.js";

const IncomeOverview = ({ transactions, onAddIncome }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
    }, [transactions]);


    return (
        <div className="card mt-6">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg font-medium">Income Overview</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Track your income and analyze your income over time</p>
                </div>

                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>

            <div className="mt-10">
                <CustomBarChart
                    data={chartData}
                    xAxisKey="month"
                />
            </div>
        </div>
    )
}

export default IncomeOverview