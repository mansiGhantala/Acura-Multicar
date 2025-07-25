import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGlobalMessage } from "../context/GlobalMessageContext";
import GlobalMessage from "../components/GlobalMessage";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { setGlobalMessage } = useGlobalMessage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const success = await loginUser(data);
    if (success) {
      setGlobalMessage({ text: "Login Successful!", type: "success" });

      setTimeout(() => {
        setGlobalMessage({ text: "", type: "" });
      }, 2000);

      navigate("/");
    } else {
      setGlobalMessage({ text: "Invalid email or password", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <GlobalMessage />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#415D8A]">
            Login
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              {...register("email")}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="you@example.com"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.email?.message}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              {...register("password")}
              type="password"
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="password"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#415D8A] text-white px-4 py-2 rounded w-full hover:bg-[#2f4c77] transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-[#415D8A] underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
