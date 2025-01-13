import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
    alert("Your message has been sent successfully!");
    reset();
  };

  return (
    <div className="text-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg leading-relaxed">
              Have questions or need assistance? We'd love to hear from you!
              Feel free to reach out to us via the contact details or the form
              below, and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side */}
            <div className="md:w-1/2 space-y-6 mt-0 md:mt-24">
              <div className="flex items-center gap-4">
                <div className="bg-gray-700 p-3 rounded-full flex items-center justify-center">
                  <i className="ri-home-4-fill text-2xl text-white"></i>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Address</h2>
                  <p>Vesu,Surat</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-700 p-3 rounded-full flex items-center justify-center">
                  <i className="ri-phone-line text-2xl text-white"></i>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Phone</h2>
                  <p>+91 9638724826</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-700 p-3 rounded-full flex items-center justify-center">
                  <i className="ri-mail-line text-2xl text-white"></i>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Email</h2>
                  <p>parvashah305@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Right Side*/}
            <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <form onSubmit={handleSubmit(onSubmit)}>
             
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

    
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message or Query
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Enter your message or query"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

              
                <button
                  type="submit"
                  className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
