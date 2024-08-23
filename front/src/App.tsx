import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/*" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="*" element={<Dashboard isAuthenticated={isAuthenticated} />} />
        </Route>

        <Route path="*" element={isAuthenticated ? <Dashboard isAuthenticated={isAuthenticated} /> : <Login onLogin={handleLogin} />} />
      </Routes>

      <Footer />
    </div>
  );
}