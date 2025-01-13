import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const donate = () => {
    navigate("/registerdonor");
  };

  const register = () => {
    navigate("/registerngo");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
      
        <h1 className="text-xl font-bold">NGO Portal</h1>

        
        <div className="md:hidden" onClick={toggleMenu}>
          <button className="focus:outline-none">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        
        <ul className="hidden md:flex space-x-6">
          <li>
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-400"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/about")}
              className="hover:text-gray-400"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-gray-400"
            >
              Contact
            </button>
          </li>
        </ul>

    
        <div className="hidden md:flex space-x-4">
          <button
            onClick={donate}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Donate Now
          </button>
          <button
            onClick={register}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Register as NGO
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-black text-white p-4 space-y-4">
          <ul>
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
          <div className="space-y-4">
            <button
              onClick={donate}
              className="bg-white text-black w-full py-2 rounded hover:bg-gray-300"
            >
              Donate Now
            </button>
            <button
              onClick={register}
              className="bg-white text-black w-full py-2 rounded hover:bg-gray-300"
            >
              Register as NGO
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;