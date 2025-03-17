import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:9090/api/customers/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account");
      }

      const data = await response.json();
      console.log("Account created successfully:", data);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full h-[25%]">
      <div className="form w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-5 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300">
        <p className="text-black translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2 font-semibold text-2xl absolute right-0">
          Welcome
        </p>

        <div className="capitalize">
          <p className="text-2xl text-black pb-5">Create Your Account</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col items-start w-full">
              <label className="text-sm text-black font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Your Username"
                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-black placeholder:text-gray-500 focus:outline-none text-black placeholder:text-xs"
                required
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <label className="text-sm text-black font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-black placeholder:text-gray-500 focus:outline-none text-black placeholder:text-xs"
                required
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <label className="text-sm text-black font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-black placeholder:text-gray-500 focus:outline-none text-black placeholder:text-xs"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-xs text-center">{error}</div>
            )}

            <div className="inline-flex gap-5">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 focus:outline-none focus:scale-110 font-semibold text-xs py-2 rounded-[5px] hover:scale-110 transition-all hover:transition text-white bg-black shadow-black shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Sign Up"}
              </button>
              <Link
                to="/login"
                className="px-6 focus:outline-none focus:scale-110 font-semibold text-xs py-2 rounded-[5px] hover:scale-110 transition-all hover:transition text-black bg-gray-100 shadow-black shadow-lg text-center"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
