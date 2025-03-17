"use client";

import { useState } from "react";
import { useAuthSlice } from "../store/slice/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const { sendOtp, login } = useAuthSlice();
  const router = useRouter();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await sendOtp(mobileNumber);
      toast.success("OTP sent to your mobile number!");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(mobileNumber, otp);
      toast.success("Logged in successfully!");
      router.push("/cart"); // Redirect to cart
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Check your OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label htmlFor="mobileNumber" className="block text-gray-700">Mobile Number</label>
              <input
                type="text"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-gray-700">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;