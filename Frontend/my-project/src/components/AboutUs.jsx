import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; 
import img3 from "../assets/img3.png"

const AboutUs = () => {
  return (
    <div className=" text-black min-h-screen flex flex-col">
   
      <Navbar />

      <div className="flex-grow mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-center mb-12">About Us</h1>
          <div className="flex flex-col-reverse md:flex-row items-center gap-8">
            {/* Left Side Content */}
            <div className="md:w-1/2 text-lg leading-relaxed">
              <p>
                Welcome to our NGO Portal, where we strive to bridge the gap
                between those in need and those who have the power to help. Our
                platform is designed to empower NGOs by providing them with the
                tools they need to raise funds effectively and transparently. 
                At the same time, we make it easier than ever for donors to find
                and support causes that resonate with them. Through innovation
                and collaboration, we aim to create a more compassionate and
                equitable world.
              </p>
              <br />
              <p>
                Our mission is to foster trust and efficiency in the charitable 
                ecosystem. For NGOs, we offer a fully customizable platform to showcase 
                their campaigns, track progress, and connect with a community of like-minded 
                individuals. For donors, we provide a seamless and secure way to contribute 
                to causes they care about. Together, we are creating a future where generosity 
                knows no boundaries and meaningful impact is within everyone's reach.
              </p>
              <br />
              <p>
                Join us in this journey of making a difference. Whether you're an NGO
                looking to amplify your outreach or a donor seeking to make a change, 
                we have built this platform with you in mind. Together, let’s create a 
                community where every contribution, big or small, helps to create a 
                better tomorrow.
              </p>
            </div>

            {/* Right Side Image */}
            <div className="md:w-1/2">
              <img
                src={img3}
                alt="About Us"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;