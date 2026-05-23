import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LuHandCoins, LuWalletMinimal, LuReceiptText} from "react-icons/lu";

import { useUserAuth } from "../../context/useUserAuth.jsx"
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { addThousandSeperator } from "../../utils/helper.js"
import InfoCard from "../../components/Cards/InfoCard.jsx";

const Home = () => {

  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.log("Something went wrong. Please try again.", err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<LuWalletMinimal />}
            label={"Total Balance"}
            value={addThousandSeperator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label={"Total Income"}
            value={addThousandSeperator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuReceiptText />}
            label={"Total Expense"}
            value={addThousandSeperator(dashboardData?.totalExpense || 0)}
            color="bg-rose-500"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home