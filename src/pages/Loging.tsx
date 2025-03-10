import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsAuthenticated: (value: boolean) => void;
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
      const response = await fetch("https://fakestoreapi.com/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const users = await response.json();
      const user = users.find(
        (user: any) => user.email === email && user.password === password
      );
      console.log("user", user);
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", user);
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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
