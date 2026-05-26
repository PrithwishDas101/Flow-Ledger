import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from './pages/Auth/Login.jsx'
import SignUp from './pages/Auth/SignUp.jsx'
import Home from './pages/Dashboard/Home.jsx'
import Expense from './pages/Dashboard/Expense.jsx'
import Income from './pages/Dashboard/Income.jsx'
import UserProvider from './context/userContext.jsx';
import { useUserAuth } from './context/useUserAuth.jsx';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <AppRoutes />
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          }
        }}
      />

    </UserProvider>
  )
}

// Separate component to use hooks within UserProvider context
const AppRoutes = () => {
  // Fetch user data on app initialization
  useUserAuth();

  return (
    <Routes>
      <Route path='/' element={<Root />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/dashboard' element={<Home />} />
      <Route path='/income' element={<Income />} />
      <Route path='/expense' element={<Expense />} />
    </Routes>
  );
};

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};