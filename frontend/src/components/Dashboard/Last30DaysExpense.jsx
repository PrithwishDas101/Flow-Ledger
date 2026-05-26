import React, { useEffect, useState } from "react"

import { prepareExpenseBarChartData } from "../../utils/helper.js"
import CustomBarChart from "../Charts/CustomBarChart.jsx"

const Last30DaysExpense = ({ data }) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data || []);
    setChartData(result);

  }, [data])

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">
          Last 30 days Expense
        </h5>
      </div>

      <CustomBarChart
        data={chartData}
        xAxisKey="category"
      />
    </div>
  )
}

export default Last30DaysExpense