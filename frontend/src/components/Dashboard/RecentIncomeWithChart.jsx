import React, { useEffect, useState } from "react"
import CustomPieChart from "../Charts/CustomPieChart.jsx"

const COLORS = ["#14532D", "#22C55E", "#86EFAC", "#BBF7D0", "#F59E0B"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setChartData(dataArr || [])
    };

    useEffect(() => {
        prepareChartData();

        return () => { };
    }, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium">Last 60 days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart