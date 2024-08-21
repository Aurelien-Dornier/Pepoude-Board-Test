import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  // gestion de l'authentification
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // fonction pour vérifier l'authentification
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  };
  // vérification + ajout d'un écouteur d'événement pour la modification du localStorage
  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogin = (token: string) => {
    // console.log("Handling login with token:", token); // debug
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow h-full">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}