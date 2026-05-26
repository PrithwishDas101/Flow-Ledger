import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast"

import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import IncomeOverview from "../../components/income/IncomeOverview.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import Modal from '../../components/Modal.jsx';
import AddIncomeForm from '../../components/income/AddIncomeForm.jsx';
import IncomeList from '../../components/income/IncomeList.jsx';
import { data } from 'react-router-dom';
import DeleteAlert from '../../components/DeleteAlert.jsx';

const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Fetch all Income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.GET_ALL_INCOME
      );

      if (response.data) {
        setIncomeData(response.data);
      }

    } catch (error) {
      console.error(
        "Error fetching income details:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle add Income
  const handleAddIncome = async (income) => {

    const { source, amount, date, icon } = income;

    // validation check
    if (!source?.trim()) {
      toast.error("Source is required!");
      return;
    };

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Enter a valid amount!");
      return;
    };

    if (!date) {
      toast.error("Date is required!");
      return;
    };

    try {
      await axiosInstance.post(
        API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully!");

      // refresh income list
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle delete Income 
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME(id)
      );

      // close delete modal
      setOpenDeleteAlert({
        show: false,
        data: null,
      });

      toast.success("Income deleted successfully!");

      // refresh income list
      fetchIncomeDetails();

    } catch (error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );

      toast.error("Failed to delete income!");
    }
  };

  // Handle download Income details
  const handleDownloadIncomeDetails = async () => {

  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />

            <IncomeList
              transactions={incomeData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id })
              }}
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({
            show: false,
            data: null
          })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income