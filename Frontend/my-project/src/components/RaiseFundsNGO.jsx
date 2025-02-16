import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Navbar from "./NavbarProfile";
import Footer from "./Footer";

const backendBaseUrl = "http://localhost:3000";

const RaiseFundsNGO = () => {
  const [forms, setForms] = useState([0]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(`${backendBaseUrl}/getcampaigns`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        setCampaigns(result);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error fetching campaigns.");
      console.error("Fetch error:", error);
    }
  };

  const addNewForm = () => setForms([...forms, forms.length]);

  const saveCampaign = async (data, index, isNew = true) => {
    if (!data.heroImageFile && isNew) {
      toast.error("Hero image is required.");
      return;
    }

    try {
      const url = isNew
        ? `${backendBaseUrl}/addcampaign`
        : `${backendBaseUrl}/updatecampaign/${data.id}`;
      const method = isNew ? "POST" : "PUT";

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("cause", data.cause);
      formData.append("targetFunds", data.targetFunds);

      if (data.heroImageFile) {
        formData.append("heroImage", data.heroImageFile);
      }

      if (data.imagesFiles.length > 0) {
        data.imagesFiles.forEach((file) => formData.append("images", file));
      }

      const response = await fetch(url, {
        method,
        credentials: "include",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setCampaigns((prevCampaigns) =>
          isNew
            ? [...prevCampaigns, result.campaign]
            : prevCampaigns.map((c) =>
                c._id === result.campaign._id ? result.campaign : c
              )
        );
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error saving the campaign.");
      console.error("Save error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-8 mt-16 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Raise Funds</h1>
        <h2 className="text-2xl font-semibold text-center mb-4">
          {campaigns.length > 0 ? "Ongoing Campaigns" : "No Ongoing Campaigns"}
        </h2>
        {campaigns.map((campaign, index) => (
          <CampaignForm
            key={campaign._id}
            index={index}
            campaign={campaign}
            saveCampaign={(data) => saveCampaign(data, index, false)}
          />
        ))}
        <h2 className="text-2xl font-semibold text-center mt-8 mb-4">
          Add New Campaigns
        </h2>
        {forms.map((formIndex) => (
          <CampaignForm
            key={`new-${formIndex}`}
            index={formIndex}
            saveCampaign={(data) => saveCampaign(data, formIndex, true)}
          />
        ))}
        <div className="text-center">
          <button
            onClick={addNewForm}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Add New Campaign
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const CampaignForm = ({ index, campaign = {}, saveCampaign }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: campaign.title || "",
      cause: campaign.cause || "",
      targetFunds: campaign.targetFunds || "",
      heroImage: null,
      images: [],
    },
  });

  const heroImageUrl = campaign.heroImage
    ? `${backendBaseUrl}${campaign.heroImage}`
    : null;
  const imagesUrls = campaign.images
    ? campaign.images.map((img) => `${backendBaseUrl}${img}`)
    : [];

  const [heroImagePreview, setHeroImagePreview] = useState(heroImageUrl);
  const [imagePreviews, setImagePreviews] = useState(imagesUrls);
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [imagesFiles, setImagesFiles] = useState([]);

  const onSubmit = (data) => {
    saveCampaign({
      ...data,
      heroImageFile,
      imagesFiles,
      id: campaign._id,
    });

    if (!campaign._id) {
      reset();
      setHeroImagePreview(null);
      setImagePreviews([]);
      setHeroImageFile(null);
      setImagesFiles([]);
    }
  };

  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImageFile(file);
      setHeroImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagesFiles([...imagesFiles, ...files]);
    setImagePreviews([...imagePreviews, ...previews]);
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4 mb-6">
      <h2 className="text-lg font-bold">Campaign {index + 1}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Cause</label>
          <input
            type="text"
            {...register("cause", { required: "Cause is required" })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Target Funds</label>
          <input
            type="number"
            {...register("targetFunds", { required: "Target Funds are required" })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Hero Image</label>
          <input type="file" onChange={handleHeroImageUpload} />
          {heroImagePreview && <img src={heroImagePreview} alt="Hero" className="w-full h-40 object-cover mt-2" />}
        </div>
        <div>
          <label className="block font-semibold mb-2">Upload Images</label>
          <input type="file" multiple onChange={handleImagesUpload} />
          <div className="flex space-x-4 mt-4">{imagePreviews.map((img, i) => <img key={i} src={img} alt="Preview" className="w-24 h-24 object-cover" />)}</div>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">Save</button>
      </form>
    </div>
  );
};

export default RaiseFundsNGO;