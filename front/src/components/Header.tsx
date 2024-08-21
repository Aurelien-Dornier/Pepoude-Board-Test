import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white flex justify-between items-center shadow p-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Kiboude & Pépin
      </h1>
      <button className="btn btn-outline" onClick={handleLogout}>
        Déconnexion
      </button>
    </header>
  );
}
