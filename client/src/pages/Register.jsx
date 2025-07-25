import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalMessage } from "../context/GlobalMessageContext";
import api from "../api/api";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { globalMessage, setGlobalMessage } = useGlobalMessage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      setGlobalMessage({
        text: response?.data?.message || "Registration successful!",
        type: "success",
      });
      setTimeout(() => {
        setGlobalMessage({ text: "", type: "" });
        navigate("/login");
      }, 2000);
    } catch (error) {
      setGlobalMessage({
        text: error.response?.data?.message || "Registration failed. Try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#415D8A]">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            {...register("name")}
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Your Name"
          />
          <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            {...register("email")}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="you@example.com"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            {...register("password")}
            type="password"
            className={`w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Password"
          />
          <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
        </div>

        {globalMessage.text && (
          <p
            className={`text-sm font-medium p-3 rounded text-center mb-4 ${
              globalMessage.type === "success"
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {globalMessage.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#415D8A] text-white px-4 py-2 rounded w-full hover:bg-[#2f4c77] disabled:opacity-70 transition"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#415D8A] underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
