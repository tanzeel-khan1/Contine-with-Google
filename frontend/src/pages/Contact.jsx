import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useContact from "../Hooks/Contact";

const Contact = () => {
  const { sendContactMessage, getContactsByUserId, loading } = useContact();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    getContactsByUserId();
  }, []);

  const onSubmit = async (data) => {
    try {
      await sendContactMessage(data);

      toast.success("Message sent successfully ");

      reset();

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8 border border-purple-100">
        
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-2">
          Contact Us
        </h2>
        <p className="text-center text-gray-500 mb-6">
          We'd love to hear from you 
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              rows="4"
              placeholder="Your Message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 resize-none"
            />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full py-3 rounded-xl cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-300 disabled:opacity-50"
          >
            {loading || isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
