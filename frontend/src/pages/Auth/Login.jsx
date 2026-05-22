import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { validateEmail } from '../../utils/helper.js';
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import AuthLayout from '../../components/layouts/AuthLayout.jsx';
import Input from '../../components/inputs/Input.jsx';
import { UserContext } from '../../context/userContext.jsx';

const Login = () => {



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  // Login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    // LOGIN API CALL
    try {

      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

    } catch (error) {

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong! Please try again later.");
      }

    }
  };

  return (
    <AuthLayout>
      <div className='w-full max-w-lg h-3/4 md:h-full flex flex-col justify-center'>

        <h3 className='text-2xl md:text-3xl font-extrabold text-zinc-900'>
          Welcome Back
        </h3>

        <p className='text-sm text-slate-600 mt-2 mb-6'>
          Please enter your credentials to continue.
        </p>

        <form onSubmit={handleLogin} className='space-y-4'>

          {/* Email Input */}
          <Input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="batsy@gmail.com"
            autoComplete="email"
          />

          {/* Password Input */}
          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          {error && (
            <p className='text-red-500 text-sm'>
              {error}
            </p>
          )}

          <button
            type='submit'
            className='btn-primary'
          >
            LOGIN
          </button>

          <p className='text-[15px] text-slate-600 mt-4'>
            Don&apos;t have an account?{" "}
            <Link
              className='font-semibold text-primary hover:underline'
              to='/signup'
            >
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;