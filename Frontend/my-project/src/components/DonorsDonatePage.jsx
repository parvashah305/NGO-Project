import React, { useState, useEffect } from "react";

const ngoPreviewData = {
  name: "Helping Hands",
  tagline: "Together, we make a difference!",
  color: "#4CAF50", 
  font: "'Arial', sans-serif", 
};
 
const initialCampaigns = [
  {
    title: "Support Education for Underprivileged",
    cause: "Education",
    target: 50000,
    raised: 20000,
  },
  {
    title: "Healthcare for Rural Areas",
    cause: "Healthcare",
    target: 75000,
    raised: 30000,
  },
];

const DonorsDonatePage = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [donationAmount, setDonationAmount] = useState("");

  
  const handleDonate = (index) => {
    if (donationAmount && donationAmount > 0) {
      const updatedCampaigns = [...campaigns];
      updatedCampaigns[index].raised += parseInt(donationAmount);
      setCampaigns(updatedCampaigns);
      setDonationAmount("");
    } else {
      alert("Please enter a valid donation amount!");
    }
  };

  return (
    <div
      className="min-h-screen "
      style={{ fontFamily: ngoPreviewData.font, backgroundColor: "#f9f9f9" }}
    >
      {/* NGO Preview Section */}
      <div
        className="p-6 mb-8 text-center"
        style={{ backgroundColor: ngoPreviewData.color, color: "white" }}
      >
        <h1 className="text-4xl font-bold">{ngoPreviewData.name}</h1>
        <p className="text-lg">{ngoPreviewData.tagline}</p>
      </div>

      {/* Campaigns Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Campaigns</h2>
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4"
          >
            <h3 className="text-xl font-bold">{campaign.title}</h3>
            <p className="text-gray-600">
              <strong>Cause:</strong> {campaign.cause}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                  width: `${(campaign.raised / campaign.target) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-gray-600">
              Raised: ₹{campaign.raised} / ₹{campaign.target}
            </p>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="Donation Amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={() => handleDonate(index)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorsDonatePage;