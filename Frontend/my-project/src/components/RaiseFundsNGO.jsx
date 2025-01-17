import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const RaiseFundsNGO = () => {
  const [forms, setForms] = useState([0]);
  const [campaigns, setCampaigns] = useState([]);

  const addNewForm = () => {
    setForms([...forms, forms.length]);
  };

  const saveCampaign = (data, index) => {
    const updatedCampaigns = [...campaigns];
    updatedCampaigns[index] = { ...data, id: `campaign-${index}-${Date.now()}` };
    setCampaigns(updatedCampaigns);
    console.log("Saved Campaigns:", updatedCampaigns);
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
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);

  const onSubmit = (data) => {
    saveCampaign(data, index);
    reset();
    setImagePreviews([]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4 mb-6">
      <h2 className="text-lg font-bold">Campaign {index + 1}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
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

        {/* Cause */}
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

        {/* Target Funds */}
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

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload Images</label>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  field.onChange(Array.from(e.target.files).map((file) => file.name));
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

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default RaiseFundsNGO;