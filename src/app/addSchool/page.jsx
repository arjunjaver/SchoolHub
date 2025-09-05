"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image") {
          formData.append("image", data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setMessage("School added successfully!");
        setMessageType("success");
        setShowPopup(true);
        reset();
      } else {
        setMessage(result.error || "Something went wrong");
        setMessageType("error");
        setShowPopup(true);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
      setMessageType("error");
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 300);
  };

  // Auto-close popup after 4 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        closePopup();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Add New School</h1>
          <p className="text-slate-300">Fill in the details to register a new educational institution</p>
        </div>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* School Name */}
            <div>
              <label className="block text-white font-medium mb-2">School Name *</label>
              <input
                {...register("name", { required: "School name is required" })}
                placeholder="Enter school name"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all backdrop-blur-sm"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errors.name.message}
              </p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-white font-medium mb-2">Address *</label>
              <input
                {...register("address", { required: "Address is required" })}
                placeholder="Enter full address"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all backdrop-blur-sm"
              />
              {errors.address && <p className="text-red-400 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errors.address.message}
              </p>}
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">City *</label>
                <input
                  {...register("city", { required: "City is required" })}
                  placeholder="Enter city"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all backdrop-blur-sm"
                />
                {errors.city && <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.city.message}
                </p>}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">State *</label>
                <input
                  {...register("state", { required: "State is required" })}
                  placeholder="Enter state"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all backdrop-blur-sm"
                />
                {errors.state && <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.state.message}
                </p>}
              </div>
            </div>

            {/* Contact & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Contact Number *</label>
                <input
                  type="number"
                  {...register("contact", {
                    required: "Contact number is required",
                    minLength: { value: 10, message: "At least 10 digits" },
                    maxLength: { value: 12, message: "At most 12 digits" },
                  })}
                  placeholder="Enter contact number"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all backdrop-blur-sm"
                />
                {errors.contact && <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.contact.message}
                </p>}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  {...register("email_id", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                  })}
                  placeholder="Enter email address"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all backdrop-blur-sm"
                />
                {errors.email_id && <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.email_id.message}
                </p>}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-white font-medium mb-2">School Image *</label>
              <div className="relative">
                <input
                  type="file"
                  {...register("image", {
                    required: "Image is required",
                    validate: {
                      lessThan100KB: (files) =>
                        files[0]?.size < 100 * 1024 || "Image must be less than 100KB",
                      acceptedFormats: (files) =>
                        ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type) ||
                        "Only JPG/PNG images are allowed",
                    },
                  })}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600 file:cursor-pointer focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all backdrop-blur-sm"
                />
              </div>
              {errors.image && <p className="text-red-400 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errors.image.message}
              </p>}
              <p className="text-slate-400 text-sm mt-2">Maximum file size: 100KB | Formats: JPG, PNG</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Adding School...</span>
                </div>
              ) : (
                "Add School"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Modern Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className={`relative max-w-md w-full transform transition-all duration-500 ease-out ${
              showPopup ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {/* Popup Content */}
            <div className={`relative bg-gradient-to-br ${
              messageType === "success" 
                ? "from-emerald-500/90 to-green-600/90" 
                : "from-red-500/90 to-red-600/90"
            } backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20`}>
              
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Success/Error Icon */}
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${
                  messageType === "success" ? "bg-emerald-400/30" : "bg-red-400/30"
                }`}>
                  {messageType === "success" ? (
                    <svg className="w-12 h-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {messageType === "success" ? "Success!" : "Error!"}
                </h3>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  {message}
                </p>

                {/* Action Button */}
                <button
                  onClick={closePopup}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                    messageType === "success"
                      ? "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                      : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                  }`}
                >
                  {messageType === "success" ? "Continue" : "Try Again"}
                </button>
              </div>

              {/* Animated Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-3xl overflow-hidden">
                <div 
                  className="h-full bg-white/40 rounded-full transition-all duration-4000 ease-linear"
                  style={{
                    width: showPopup ? '0%' : '100%',
                    animation: showPopup ? 'progressBar 4s linear forwards' : 'none'
                  }}
                ></div>
              </div>
            </div>

            {/* Background Glow Effect */}
            <div className={`absolute inset-0 -z-10 rounded-3xl blur-xl ${
              messageType === "success" 
                ? "bg-emerald-400/20" 
                : "bg-red-400/20"
            }`}></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progressBar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}