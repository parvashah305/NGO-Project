import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate=useNavigate()
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
       
        <div>
          <h2 className="text-xl font-bold">NGO Portal</h2>
          <p className="text-gray-400 mt-2">
            Empowering communities through collaboration and support.
          </p>
        </div>

     
        <div>
          <h3 className="text-lg font-bold mb-4">Links</h3>
          <ul className="space-y-2">
          <li>
              <button
                onClick={() => navigate("/")}
                className="block hover:text-gray-400 w-full text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/about")}
                className="block hover:text-gray-400 w-full text-left"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/contact")}
                className="block hover:text-gray-400 w-full text-left"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="hover:text-gray-400">
            <i class="ri-instagram-line text-xl"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
            <i class="ri-facebook-circle-line text-xl"></i>
            </a>
          </div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <p className="text-gray-400">Vesu,Surat</p>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10">
        © 2025 NGO Portal. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;