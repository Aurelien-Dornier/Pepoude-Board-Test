import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createAccount } from "../api/Api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification que les mots de passe correspondent
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validation basique du format de l'email
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await createAccount({
        username,
        email,
        password,
      });

      if (result.success) {
        console.log("User created:", result);
        navigate("/login"); // Rediriger vers la page de connexion après succès
      } else {
        setError(result.message); // Afficher le message d'erreur
      }
    } catch (err) {
      setError("Unexpected error occurred during registration.");
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex grow justify-center items-center bg-gray-100">
    <div className="card bg-white w-full max-w-lg shadow-2xl">
      <form onSubmit={handleRegister} className="card-body">
        <h2 className="card-title text-3xl text-gray-900 pb-4">Inscription</h2>

        {/* Afficher les erreurs */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Pseudo</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="username"
            className="input input-bordered bg-gray-200"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            className="input input-bordered bg-gray-200"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"} {/* Bouton de soumission */}
            </button>
          </div>
          <div className="form-control mt-6">
            <p className="text-center p-2">Already have an account?</p>
            <button className="btn btn-outline" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  );
}