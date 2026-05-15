import React, { useState } from 'react'
import { Link } from "react-router-dom";
import AuthLayout from '../../components/layouts/AuthLayout.jsx';
import Input from '../../components/inputs/Input.jsx'
import {validateEmail} from '../../utils/helper.js'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Login form submition management
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    };

    if (!password) {
      setError("Please enter the password");
      return;
    };

    setError("");

    // LOGIN API call
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-2xl md:text-3xl font-extrabold text-zinc-900'>
          Welcome Back
        </h3>

        <p className='text-xs text-slate-700 mt-1.5 mb-6'>
          Please enter your credentials to log back in.
        </p>

        <form onSubmit={handleLogin}>

          {/* Email Input */}
          <Input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter your email here"
            autoComplete="email"
          />

          {/* Password Input */}
          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password here"
            autoComplete="current-password"
          />

          {error && <p className='text-red-500 text-xs pb-3'>{error}</p>}

          <button
            type='submit'
            className='btn-primary'>
            LOGIN
          </button>

          <p className='text-[15px] text-slate-600 mt-4'>
            Don't have an account? {" "}
            <Link className='font-semibold text-primary underline' to='/signup'>SignUp!</Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Login;