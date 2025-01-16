import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarProfile from "./NavbarProfile";
import Footer from "./Footer";

const NGODashboard = () => {
  const navigate = useNavigate();


  const handleCustomizePage = () => {
    navigate("/customizepage"); 
  };

  const handleRaiseFunds = () => {
    navigate("/raisefunds"); 
  };

  return (
    <div>
      <NavbarProfile/>
      <div className="mt-24 flex flex-col items-center justify-center p-8">
      
        <div className=" w-full max-w-3xl p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to your mission control! Together, let’s create a brighter future and make every effort count.</h1>
          <p className="text-gray-700 text-lg mb-6">
            We're thrilled to have you onboard! This is your space to make a difference. Whether you're
            here to customize your NGO's page or launch a fundraising campaign, we're here to support
            you every step of the way.
          </p>
      
          <div className="flex flex-col sm:flex-row justify-center gap-4">
      
            <button
              onClick={handleCustomizePage}
              className="px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800 transition"
            >
              Customize Your Page
            </button>
      
            <button
              onClick={handleRaiseFunds}
              className="px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800 transition"
            >
              Raise Funds
            </button>
          </div>
        </div>
      
        <div className="mt-8 text-center text-gray-600">
          <p>
            Need help? <a href="/help" className="text-blue-500 hover:underline">Contact Us</a>.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default NGODashboard;