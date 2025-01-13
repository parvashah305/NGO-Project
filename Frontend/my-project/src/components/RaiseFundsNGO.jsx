import React, { useState } from "react";

const RaiseFundsNGO = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("#000000");

  const addCampaign = () => {
    setCampaigns([
      ...campaigns,
      {
        title: "",
        cause: "",
        targetFunds: 0,
        raisedFunds: 0,
        images: [],
      },
    ]);
  };

  const updateCampaign = (index, field, value) => {
    const updatedCampaigns = [...campaigns];
    updatedCampaigns[index][field] = value;
    setCampaigns(updatedCampaigns);
  };

  const handleImageUpload = (index, e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    const updatedCampaigns = [...campaigns];
    updatedCampaigns[index].images = [...updatedCampaigns[index].images, ...imageUrls];
    setCampaigns(updatedCampaigns);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 space-y-6">
        <h2 className="text-lg font-bold">Raise Funds</h2>

        {/* Text Color */}
        <div>
          <label className="block font-semibold mb-2">Text Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Font */}
        <div>
          <label className="block font-semibold mb-2">Font</label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
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

        {/* Add Campaign */}
        <button
          onClick={addCampaign}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Add Campaign
        </button>
      </div>

      {/* Right Content Area */}
      <div
        className="w-3/4 p-8 space-y-6"
        style={{ backgroundColor: bgColor }}
      >
        {campaigns.map((campaign, index) => (
          <div key={index} className="bg-white p-6 rounded shadow space-y-4">
            {/* Title */}
            <div>
              <label className="block font-semibold mb-2">Title</label>
              <input
                type="text"
                value={campaign.title}
                onChange={(e) =>
                  updateCampaign(index, "title", e.target.value)
                }
                className="w-full border rounded p-2"
                style={{ fontFamily: font, fontSize: `${fontSize}px`, color: textColor }}
              />
            </div>

            {/* Cause */}
            <div>
              <label className="block font-semibold mb-2">Cause</label>
              <input
                type="text"
                value={campaign.cause}
                onChange={(e) =>
                  updateCampaign(index, "cause", e.target.value)
                }
                className="w-full border rounded p-2"
                style={{ fontFamily: font, fontSize: `${fontSize}px`, color: textColor }}
              />
            </div>

            {/* Target Funds */}
            <div>
              <label className="block font-semibold mb-2">Target Funds</label>
              <input
                type="number"
                value={campaign.targetFunds}
                onChange={(e) =>
                  updateCampaign(index, "targetFunds", e.target.value)
                }
                className="w-full border rounded p-2"
                style={{ fontFamily: font, fontSize: `${fontSize}px`, color: textColor }}
              />
            </div>

            

            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-2">Add Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(index, e)}
                className="w-full"
              />
              <div className="flex space-x-4 mt-4">
                {campaign.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Campaign"
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Horizontal Line */}
            <hr className="border-t-2 mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaiseFundsNGO;