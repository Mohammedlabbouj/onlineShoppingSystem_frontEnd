import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    dob: "",
    gender: "male",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-black">
      <div className="w-full max-w-2xl bg-black rounded-lg p-8 shadow-[0_0_50px_-12px_rgba(255,255,255,0.25)]">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                className="w-full bg-white text-black border-2 border-black rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                className="w-full bg-white text-black border-2 border-black rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Username
              </label>
              <input
                className="w-full bg-white text-black border-2 border-black rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                className="w-full bg-white text-black border-2 border-black rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              className="flex items-center justify-center px-6 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
            >
              <img
                src="../public/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-100 transition-colors mt-6"
          >
            Create Account
          </button>

          <div className="flex items-center justify-center mt-6">
            <div className="border-t border-gray-600 w-full"></div>
            <p className="text-white mx-4">or</p>
            <div className="border-t border-gray-600 w-full"></div>
          </div>

          <p className="text-center text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
