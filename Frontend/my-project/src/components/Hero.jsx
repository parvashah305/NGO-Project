import React from "react";
import img2 from '../assets/img2.png'
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate =useNavigate()

    const donate=()=>{
        navigate('/registerdonor')
    }
    const register=()=>{
        navigate('/registerngo')
    }
  return (
    <section
      id="home"
      className="flex flex-col-reverse md:flex-row items-center justify-between bg-white text-black min-h-screen pt-24 px-6 mb-4 md:mb-0"
    >
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold">
          Empowering Communities, One Step at a Time
        </h1>
        <p className="text-lg">
          Join us in making a difference! Whether you're an NGO looking to
          amplify your impact or a donor ready to contribute to meaningful
          causes, our platform connects you to opportunities that change lives.
          Empower education, improve healthcare, and build sustainable futures
          with your support.
        </p>
        <div className="flex flex-wrap gap-6">
            <button onClick={donate} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
              Donate Now
            </button>
            <button onClick={register} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
              Register as NGO
            </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 mt-6 md:mt-0">
        <img
          src={img2}
          alt="Hero"
          className="w-full "
        />
      </div>
    </section>
  );
};

export default Hero;