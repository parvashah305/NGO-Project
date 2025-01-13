import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CustomizePageNGO = () => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [bgImage, setBgImage] = useState(null);
  const [ngoName, setNgoName] = useState("Your NGO Name");
  const [ngoNameColor, setNgoNameColor] = useState("#000000");
  const [ngoTextColor, setNgoTextColor] = useState("#000000");
  const [description, setDescription] = useState(
    "We are dedicated to making the world a better place through our initiatives."
  );
  
  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bgPosition, setBgPosition] = useState("center");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState("");

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBgImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => URL.createObjectURL(file));
    setVideos([...videos, ...newVideos]);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 space-y-6">
        <h2 className="text-lg font-bold">Customize Your Page</h2>

        {/* Change Background Color */}
        <div>
          <label className="block font-semibold mb-2">Change Background Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Change NGO Name Color */}
        <div>
          <label className="block font-semibold mb-2">NGO Name Color</label>
          <input
            type="color"
            value={ngoNameColor}
            onChange={(e) => setNgoNameColor(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Change NGO Text Color */}
        <div>
          <label className="block font-semibold mb-2">NGO Text Color</label>
          <input
            type="color"
            value={ngoTextColor}
            onChange={(e) => setNgoTextColor(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Change Font */}
        <div>
          <label className="block font-semibold mb-2">Change Font</label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block font-semibold mb-2">Font Size</label>
          <input
            type="range"
            min="12"
            max="32"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Background Image */}
        <div>
          <label className="block font-semibold mb-2">Header Background Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBgImageChange}
            className="w-full"
          />
        </div>

        {/* Adjust Background Position */}
        <div>
          <label className="block font-semibold mb-2">Adjust Background Position</label>
          <div className="flex space-x-2">
            <button
              onClick={() => setBgPosition("top")}
              className="p-2 bg-gray-300 rounded-full"
            >
              <FaArrowUp />
            </button>
            <button
              onClick={() => setBgPosition("bottom")}
              className="p-2 bg-gray-300 rounded-full"
            >
              <FaArrowDown />
            </button>
            <button
              onClick={() => setBgPosition("left")}
              className="p-2 bg-gray-300 rounded-full"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => setBgPosition("right")}
              className="p-2 bg-gray-300 rounded-full"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Media Upload */}
        <div>
          <label className="block font-semibold mb-2">Add Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Add Videos</label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoUpload}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Add Blog Content</label>
          <textarea
            value={blogs}
            onChange={(e) => setBlogs(e.target.value)}
            className="w-full border rounded p-2 h-32"
          />
        </div>

        {/* General Details Modal */}
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            General Details
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">General Details</h2>
            <label className="block mb-2">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <label className="block mb-2">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <label className="block mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right Preview Area */}
      <div
        className="w-3/4  space-y-6"
        style={{
          backgroundColor: bgColor,
        }}
      >
        {/* Header Section */}
        <div
          className="relative h-48 flex items-center justify-center"
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: bgPosition,
          }}
        >
          <h1
            className="text-4xl font-bold text-center"
            style={{
              fontFamily: font,
              color: ngoNameColor,
            }}
          >
            {ngoName}
          </h1>
        </div>

        {/* NGO Details */}
        <div className=" p-6 ">
          <h2
            className="text-xl font-bold mb-2"
            style={{ fontFamily: font, fontSize: `${fontSize}px` }}
          >
            About Us
          </h2>
          <p
            style={{ fontFamily: font, fontSize: `${fontSize}px`, color: ngoTextColor }}
            className="mb-4"
          >
            {description}
          </p>
          <p
            style={{ fontFamily: font, fontSize: `${fontSize}px`, color: ngoTextColor }}
          >
            Phone: {phone}
          </p>
          <p
            style={{ fontFamily: font, fontSize: `${fontSize}px`, color: ngoTextColor }}
          >
            Address: {address}
          </p>
        </div>

        {/* Media Section */}
        <div className="space-y-4 p-6">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: font, fontSize: `${fontSize}px` }}
          >
            Media
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="NGO Media"
                className="w-full h-48 object-cover rounded"
              />
            ))}
            {videos.map((vid, index) => (
              <video
                key={index}
                src={vid}
                controls
                className="w-full h-48 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Blog Section */}
        {blogs && (
          <div className=" p-6">
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: font, fontSize: `${fontSize}px` }}
            >
              Blog
            </h2>
            <p style={{ fontFamily: font, fontSize: `${fontSize}px` }}>{blogs}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizePageNGO;