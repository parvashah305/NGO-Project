import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NGOLogin from "./NGOLogin"; 
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NGORegister = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate=useNavigate()

  useEffect(()=>{
    toast.dismiss()
  },[])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data);

    const NGOInfo={
      name:data.name,
      email:data.email,
      password:data.password
    }

    try {
      const res = await fetch("http://localhost:3000/ngo/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NGOInfo),
      });

      const result = await res.json();

      if(res.ok){
        toast.success(result.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
        setTimeout(()=>{
          navigate('/ngodashboard')
        },3000)
      }
      else{
        toast.error(result.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
        });
      }

    } catch (error) {
      alert(error)
    }

  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col lg:flex-row mt-24">
      
        {/* Left Section */}
        <div className="lg:w-1/2 text-black p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Why Register Your NGO?</h2>
          <ul className="space-y-4">
            <li>
              <span className="font-semibold">Expand Your Reach:</span> Connect
              with passionate donors and increase visibility.
            </li>
            <li>
              <span className="font-semibold">Simplify Fundraising:</span> List
              your needs and get matched with the right donors.
            </li>
            <li>
              <span className="font-semibold">Build Trust:</span> Show your NGO as
              reliable and transparent with verified profiles.
            </li>
            <li>
              <span className="font-semibold">Track Donations:</span> Use a
              streamlined dashboard to manage donations effectively.
            </li>
            <li>
              <span className="font-semibold">Empower Your Mission:</span> Focus
              on making a difference while we handle the rest.
            </li>
          </ul>
        </div>
        {/* Right Section */}
        <div className="lg:w-1/2 p-8 bg-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Register Your NGO
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Name *
              </label>
              <input
                type="text"
                placeholder="Enter Name of NGO"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring ${
                  errors.name ? "focus:ring-red-500" : "focus:ring-gray-400"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email *
              </label>
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
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
      
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password *
              </label>
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
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
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
              onClick={openModal}
              className="text-black font-semibold hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      
        {isModalOpen && <NGOLogin closeModal={closeModal} />}
      
      </div>
      <Footer/>
    </div>
  );
};

export default NGORegister;