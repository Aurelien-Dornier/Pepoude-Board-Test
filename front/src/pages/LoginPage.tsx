import Login from "../components/Login";

export default function LoginPage({
  onLogin
}: {
  onLogin: (token: string) => void
}) {
  return (
    <div className="flex justify-center items-center">
      <Login onLogin={onLogin} />
    </div>
  );
}