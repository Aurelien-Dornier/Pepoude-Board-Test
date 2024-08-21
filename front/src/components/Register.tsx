import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createAccount } from "../api/Api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nouveau champ pour confirmer le mot de passe
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Indicateur de chargement

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification que le mot de passe et la confirmation correspondent
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); // Commencer le chargement
    setError(""); // Réinitialiser l'erreur

    try {
      const user = await createAccount({
        username,
        email,
        password,
      });
      console.log("User created:", user);
      navigate("/login"); // Rediriger vers la page de connexion après succès
    } catch (err) {
      setError("An error occurred during registration, please try again");
      console.error(err);
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
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
              {loading ? "Signing Up..." : "Sign Up"}{" "}
              {/* Bouton de soumission */}
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
  );
}
