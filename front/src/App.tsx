import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  // Gestion de l'authentification
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fonction pour vérifier l'authentification
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  };

  // Vérification + ajout d'un écouteur d'événement pour la modification du localStorage
  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Gestion du login
  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Le header commun */}
        <Header />

        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* Route protégée par une authentification */}
          <Route
            path="/dashboard/*"
            element={<PrivateRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="" element={<Dashboard />} />
          </Route>

          {/* Redirection par défaut */}
          <Route
            path="*"
            element={
              isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />
            }
          />
        </Routes>

        {/* Le footer commun */}
        <Footer />
      </div>
  );
}
