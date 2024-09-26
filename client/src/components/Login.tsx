import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginUser } from "../api/Api";

export default function Login({
  onLogin,
}: {
  onLogin: (token: string) => void;
}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      console.log("Login response:", response);

      if (response.success && response.data.token) {
        console.log("Login successful, token:", response.data.token);
        onLogin(response.data.token);
        navigate("/dashboard");
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password, please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex grow justify-center items-center bg-gray-100">
      <div className="card bg-white w-full max-w-md shadow-2x">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="card-title text-3xl text-gray-900 pb-4">Connexion</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="email"
              className="input input-bordered bg-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              className="input input-bordered bg-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs"
                />
                <span className="label-text pl-2">Remember me</span>
              </label>
            </div>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div>
            <div className="form-control mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="form-control mt-6">
              <p className="text-center p-2">Don't have an account?</p>
              <button className="btn btn-outline" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
