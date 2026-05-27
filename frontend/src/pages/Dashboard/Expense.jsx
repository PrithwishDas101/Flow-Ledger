import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import { useUserAuth } from '../../context/useUserAuth.jsx';
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import ExpenseOverview from "../../components/expense/ExpenseOverview.jsx";
import Modal from '../../components/Modal.jsx';
import AddExpenseForm from "../../components/expense/AddExpenseForm.jsx";
import ExpenseList from "../../components/expense/ExpenseList.jsx";
import DeleteAlert from '../../components/DeleteAlert.jsx';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Fetch all Expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );

      if (response.data) {
        setExpenseData(response.data);
      }

    } catch (error) {
      console.error(
        "Error fetching expense details:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle add Expense
  const handleAddExpense = async (expense) => {

    const { category, amount, date, icon } = expense;

    // Validation check
    if (!category?.trim()) {
      toast.error("Category is required!");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Enter a valid amount!");
      return;
    }

    if (!date) {
      toast.error("Date is required!");
      return;
    }

    try {
      await axiosInstance.post(
        API_PATHS.EXPENSE.ADD_EXPENSE,
        {
          category,
          amount,
          date,
          icon,
        }
      );

      setOpenAddExpenseModal(false);

      toast.success("Expense added successfully!");

      // Refresh expense list
      fetchExpenseDetails();

    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle delete Expense 
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );

      // close delete modal
      setOpenDeleteAlert({
        show: false,
        data: null,
      });

      toast.success("Expense deleted successfully!");

      // refresh expense list
      fetchExpenseDetails();

    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message
      );

      toast.error("Failed to delete expense!");
    }
  };

  // Handle download Expense details
  const handleDownloadExpenseDetails = async () => {

  };

  useEffect(() => {
    fetchExpenseDetails()
  }, [])

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className='space-y-6'>

            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />

            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id })
              }}
              onDownload={handleDownloadExpenseDetails}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({
            show: false,
            data: null
          })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense