import Login from "../components/Login";

export default function LoginPage({
  setIsAuthenticated}: {setIsAuthenticated: (isAuthenticated: boolean) => void}) {
  return (
    <div className="flex justify-center items-center">
      <Login setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
}
