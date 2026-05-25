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
            <div className="">
                <div className="">
                    <h5 className="">Income Overview</h5>
                    <p className="">Track your income and analyze your income over time</p>
                </div>

                <button className="" onClick={onAddIncome}>
                    <LuPlus className="" />
                    Add Income
                </button>
            </div>
        </div>
    )
}

export default IncomeOverview