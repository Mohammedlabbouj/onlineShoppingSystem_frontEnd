import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsAuthenticated: (value: boolean) => void;
}


interface User {
  customerId: number;
  email: string;
  username: string;
  password: string;
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
        credentials: "include", // Include cookies if needed
        mode: "cors", // Explicitly set CORS mode
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to authenticate");
      }

      const users = await response.json();
      console.log(users)
      const user = users.find(
        (user: User) => user.email === email && user.password === password
      );
      console.log(user.customerId);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Store user data in localStorage
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", user.username);
      localStorage.setItem("email", user.email);
      localStorage.setItem("id", user.customerId);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to connect to server"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Add this function to your Login component
  const checkApiStatus = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/health");
      if (!response.ok) {
        console.error("API is not responding correctly");
      }
    } catch (err) {
      console.error("Cannot connect to API:", err);
    }
  };

  // Add this useEffect to check API status when component mounts
  useEffect(() => {
    checkApiStatus();
  }, []);

  return (
    <div className="flex flex-col items-center  h-screen bg-black">
      <div className="w-full max-w-md bg-black rounded-lg p-6 shadow-[0_0_50px_-12px_rgba(255,255,255,0.25)]">
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            placeholder="Email address"
            className="bg-white text-black border-2 border-black rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black transition ease-in-out duration-150"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            className="bg-white text-black border-2 border-black rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black transition ease-in-out duration-150"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between flex-wrap">
            <label className="text-sm text-white cursor-pointer">
              <input
                className="mr-2 accent-white"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a className="text-sm text-white hover:underline mb-0.5" href="#">
              Forgot password?
            </a>
            <p className="text-white mt-4 w-full">
              Don't have an account?{" "}
              <Link to={"/signup"}>
                <div className="text-sm text-white hover:underline inline">
                  Signup
                </div>
              </Link>
            </p>
          </div>
          <button
            className={`w-full bg-white text-black border-2 border-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-black hover:text-white transition ease-in-out duration-150 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
}
