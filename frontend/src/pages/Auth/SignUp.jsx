import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


import AuthLayout from '../../components/layouts/AuthLayout.jsx';
import Input from '../../components/inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector.jsx';
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/UserContext.jsx";
import { uploadImage } from "../../utils/uploadImage.js";

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  // SignUp form submition management
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageURL = "";

    if (!fullName) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    // SIGNUP API call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageURL = imgUploadRes.imageURL || "";
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          fullName,
          email,
          password,
          profileImageURL,
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
  }
  return (
    <AuthLayout>
      <div className='lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black '>Create an Account</h3>

        <p className='text-xs text-slate-800 mt-1.25 mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-4'>
            {/* Full Name Input */}
            <Input
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Enter your full name here"
              autoComplete="email"
            />
            {/* Email Input */}
            <Input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Enter your email here"
              autoComplete="email"
            />
            <div className='md:col-span-2'>
              {/* Password Input */}
              <Input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 characters"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-3'>{error}</p>}

          <button
            type='submit'
            className='btn-primary'>
            SIGN UP
          </button>

          <p className='text-[15px] text-slate-600 mt-4'>
            Already have an account? {" "}
            <Link className='font-semibold text-primary underline' to='/login'>Login!</Link>
          </p>


        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp