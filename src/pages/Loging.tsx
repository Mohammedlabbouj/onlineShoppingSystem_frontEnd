import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface Props {
  setIsAuthenticated: (value: boolean) => void;
}

export interface User {
  customerId: number;
  email: string;
  username: string;
  password: string;
  sex: string;
  age: number;
}

export interface vender {
  vendorId: number;
  email: string;
  password: string;
  username: string;
}

export default function Login({ setIsAuthenticated }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:9090/api/customers/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // credentials: "include", // Include cookies if needed
        // mode: "cors", // Explicitly set CORS mode
      });
      const allVenders = await fetch("http://localhost:9090/api/vendors/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!allVenders.ok) {
        const errorData = await allVenders.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to authenticate");
      }
      const vendors = await allVenders.json();
      const vendor: vender = vendors.find(
        (vender: vender) =>
          vender.email === email && vender.password === password,
      );
      if (!vendor) {
        throw new Error("worng password or email" + "or this is not a vendor");
      } else {
        //Store vendor's data
        setIsAuthenticated(true);
        localStorage.setItem("userType", "vendor");
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", vendor.username);
        localStorage.setItem("email", vendor.email);
        localStorage.setItem("id", String(vendor.vendorId));
        navigate("/");
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to authenticate");
      }

      const users = await response.json();

      const user: User = users.find(
        (user: User) => user.email === email && user.password === password,
      );

      if (!user) {
        throw new Error("Invalid email or password");
      } else {
        // Store user data in localStorage

        setIsAuthenticated(true);
        localStorage.setItem("userType", "customer");
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        localStorage.setItem("id", String(user.customerId));
        localStorage.setItem("gander", user.sex);
        localStorage.setItem("age", String(user.age));
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to connect to server",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-white">
      <h1 className="text-4xl font-bold text-black mt-8">
        QUICK <span className="text-green-500">CART</span>
      </h1>
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg mt-6 border border-gray-300">
        <h2 className="text-2xl font-bold text-black mb-4 text-center ">
          Login
        </h2>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            placeholder="Email address"
            className="bg-white text-black border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            className="bg-white text-black border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between flex-wrap">
            <label className="text-sm text-black cursor-pointer">
              <input
                className="mr-2 accent-green-500"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a className="text-sm text-green-500 hover:underline" href="#">
              Forgot password?
            </a>
          </div>
          <button
            className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 transition ease-in-out duration-150 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="text-black mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-500 hover:underline">
              Sign up
            </Link>
          </p>
          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
}
