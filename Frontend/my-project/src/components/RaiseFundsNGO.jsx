import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const RaiseFundsNGO = () => {
  const [forms, setForms] = useState([0]);
  const [campaigns, setCampaigns] = useState([]);

  const addNewForm = () => {
    setForms([...forms, forms.length]);
  };

  const saveCampaign = async (data, index) => {
    try {
      
      const response = await fetch('http://localhost:3000/addcampaign', {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        const updatedCampaigns = [...campaigns];
        updatedCampaigns[index] = { ...data, id: result.campaign._id }; // Use the backend-generated ID
        setCampaigns(updatedCampaigns);
        toast.success(result.message,{
          position:"top-center",
          autoClose:"3000",
          theme:"light"
          })
      } else {
        toast.error(result.message,{
          position:"top-center",
          autoClose:"3000",
          theme:"light"
          })
      }
    } catch (error) {
      toast.error("Error",{
        position:"top-center",
        autoClose:"3000",
        theme:"light"
        })
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Raise Funds</h1>

      {forms.map((formIndex) => (
        <CampaignForm
          key={formIndex}
          index={formIndex}
          saveCampaign={saveCampaign}
        />
      ))}

      <div className="text-center">
        <button
          onClick={addNewForm}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Add More
        </button>
      </div>
    </div>
  );
};

const CampaignForm = ({ index, saveCampaign }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [heroImagePreview, setHeroImagePreview] = useState(null);

  const onSubmit = (data) => {
    
    saveCampaign(data, index);

    reset();
    setImagePreviews([]);
    setHeroImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4 mb-6">
      <h2 className="text-lg font-bold">Campaign {index + 1}</h2>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded p-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2">Cause</label>
          <input
            type="text"
            {...register("cause", { required: "Cause is required" })}
            className="w-full border rounded p-2"
          />
          {errors.cause && (
            <p className="text-red-500 text-sm">{errors.cause.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2">Target Funds</label>
          <input
            type="number"
            {...register("targetFunds", {
              required: "Target Funds are required",
              valueAsNumber: true,
            })}
            className="w-full border rounded p-2"
          />
          {errors.targetFunds && (
            <p className="text-red-500 text-sm">{errors.targetFunds.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2">Hero Image</label>
          <Controller
            name="heroImage"
            control={control}
            render={({ field }) => (
              <input
                type="file" name="heroImage"
                accept="image/*"
                onChange={(e) => {
                  field.onChange(e.target.files[0]?.name);
                  handleHeroImageUpload(e);
                }}
                className="w-full"
              />
            )}
          />
          {heroImagePreview && (
            <div className="mt-4">
              <img
                src={heroImagePreview}
                alt="Hero Preview"
                className="w-full h-40 object-cover rounded"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2">Upload Images</label>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <input
                type="file" name="images"
                multiple
                accept="image/*"
                onChange={(e) => {
                  field.onChange(
                    Array.from(e.target.files).map((file) => file.name)
                  );
                  handleImageUpload(e);
                }}
                className="w-full"
              />
            )}
          />
          <div className="flex space-x-4 mt-4">
            {imagePreviews.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default RaiseFundsNGO;


