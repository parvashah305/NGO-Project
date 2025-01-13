import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DonorLoginModal from "./DonorLoginModal"; 
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const DonorRegister = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/ngodashboard')
  };

  
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col lg:flex-row mt-24">
        {/* Left Section */}
        <div className="lg:w-1/2 text-black p-8 flex flex-col justify-center ">
          <h2 className="text-3xl font-bold mb-6">Why Should Donors Donate Here?</h2>
          <ul className="space-y-4">
            <li>
              <span className="font-semibold">Make a Direct Impact:</span> Your donations go straight to verified NGOs, ensuring that every rupee you give is used to create meaningful change.
            </li>
            <li>
              <span className="font-semibold">Support Causes That Matter to You:</span> Choose from a wide range of causes such as education, healthcare, women empowerment, disaster relief, and more.
            </li>
            <li>
              <span className="font-semibold">Verified and Transparent NGOs:</span> We collaborate only with verified organizations, providing you with confidence and trust in how your donations are used.
            </li>
            <li>
              <span className="font-semibold">Track Your Contributions:</span> Get updates on the impact of your donations. See how your support is changing lives and making a difference.
            </li>
            <li>
              <span className="font-semibold">Easy and Secure Donations:</span> Our platform ensures a hassle-free donation process with secure payment gateways to keep your transactions safe.
            </li>
          </ul>
        </div>
        {/* Right Section */}
        <div className="lg:w-1/2 p-8 bg-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Register as a Donor</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div>
              <label className="block text-gray-700 font-semibold mb-1">First Name *</label>
              <input
                type="text"
                placeholder="Enter First Name"
                {...register("fname", { required: "First Name is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.fname ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring ${
                  errors.fname ? "focus:ring-red-500" : "focus:ring-gray-400"
                }`}
              />
              {errors.fname && <p className="text-red-500 text-sm">{errors.fname.message}</p>}
            </div>
           
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Last Name *</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                {...register("lname", { required: "Last Name is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.lname ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring ${
                  errors.lname ? "focus:ring-red-500" : "focus:ring-gray-400"
                }`}
              />
              {errors.lname && <p className="text-red-500 text-sm">{errors.lname.message}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Nickname *</label>
              <input
                type="text"
                placeholder="Enter Nickname"
                {...register("nickname", { required: "Nickname is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.nickname ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring ${
                  errors.nickname ? "focus:ring-red-500" : "focus:ring-gray-400"
                }`}
              />
              {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname.message}</p>}
            </div>
          
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email *</label>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email", { required: "Email is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring ${
                  errors.email ? "focus:ring-red-500" : "focus:ring-gray-400"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password *</label>
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: "Password is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring ${
                  errors.password ? "focus:ring-red-500" : "focus:ring-gray-400"
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
           
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Register
            </button>
          </form>
          
          <p className="text-gray-700 mt-6 text-center">
            Already have an account?{" "}
            <button
              onClick={openLoginModal}
              className="text-black font-semibold hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
        
        {isLoginModalOpen && <DonorLoginModal closeModal={closeLoginModal} />}
      </div>
      <Footer/>
    </div>
  );
};

export default DonorRegister;