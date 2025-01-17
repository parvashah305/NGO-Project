import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NGOProfile = ({ ngoName, ngoEmail }) => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [showOtherCauseInput, setShowOtherCauseInput] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Profile Saved Successfully!");
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const primaryCauses = watch("primaryCauses");

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-6 bg-black text-white p-6">
        My Profile
      </h2>
      <div className="py-12 px-6 lg:px-20">
        {/* Logo Section */}
        <div className="flex items-center mb-8">
          <div className="flex-shrink-0 mr-6">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Uploaded Logo"
                className="rounded-full h-20 w-20 object-cover"
              />
            ) : (
              <div className="rounded-full h-20 w-20 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Logo</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-gray-700 mb-2">Upload your logo (PNG/JPG):</p>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                handleLogoUpload(e);
                register("logo").onChange(e);
              }}
            />
            {errors.logo && (
              <p className="text-red-500 text-sm">{errors.logo.message}</p>
            )}
          </div>
        </div>
        {/* Basic Information Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                value={ngoName}
                disabled
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                value={ngoEmail}
                disabled
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Registration Number *
              </label>
              <input
                type="text"
                {...register("registrationNumber", {
                  required: "Registration number is required",
                })}
                className="w-full p-2 border rounded"
              />
              {errors.registrationNumber && (
                <p className="text-red-500 text-sm">
                  {errors.registrationNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Date of Establishment *
              </label>
              <input
                type="date"
                {...register("dateOfEstablishment", {
                  required: "Date of establishment is required",
                })}
                className="w-full p-2 border rounded"
              />
              {errors.dateOfEstablishment && (
                <p className="text-red-500 text-sm">
                  {errors.dateOfEstablishment.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                className="w-full p-2 border rounded"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Address *
              </label>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                City *
              </label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                State *
              </label>
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Primary Causes *
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Education"
                    {...register("primaryCauses", {
                      required: "At least one primary cause is required",
                    })}
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.value === "Others" && !e.target.checked) {
                        setShowOtherCauseInput(false);
                      }
                    }}
                  />
                  Education
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Health"
                    {...register("primaryCauses")}
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.value === "Others" && !e.target.checked) {
                        setShowOtherCauseInput(false);
                      }
                    }}
                  />
                  Health
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Environment"
                    {...register("primaryCauses")}
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.value === "Others" && !e.target.checked) {
                        setShowOtherCauseInput(false);
                      }
                    }}
                  />
                  Environment
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Poverty"
                    {...register("primaryCauses")}
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.value === "Others" && !e.target.checked) {
                        setShowOtherCauseInput(false);
                      }
                    }}
                  />
                  Poverty
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Others"
                    {...register("primaryCauses", {
                      onChange: (e) => setShowOtherCauseInput(e.target.checked),
                    })}
                    className="mr-2"
                  />
                  Others
                </label>
                {errors.primaryCauses && (
                  <p className="text-red-500 text-sm">
                    {errors.primaryCauses.message}
                  </p>
                )}
              </div>
              {showOtherCauseInput && (
                <div className="mt-4">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Specify Other Cause
                  </label>
                  <input
                    type="text"
                    {...register("otherCause", {
                      required: "Please specify the cause",
                    })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.otherCause && (
                    <p className="text-red-500 text-sm">
                      {errors.otherCause.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Description *
              </label>
              <textarea
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full p-2 border rounded"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Official Website
              </label>
              <input
                type="url"
                {...register("website")}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Total Volunteers
              </label>
              <input
                type="number"
                {...register("totalVolunteers")}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                {...register("linkedin")}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Instagram
              </label>
              <input
                type="url"
                {...register("instagram")}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Twitter
              </label>
              <input
                type="url"
                {...register("twitter")}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Facebook
              </label>
              <input
                type="url"
                {...register("facebook")}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NGOProfile;
