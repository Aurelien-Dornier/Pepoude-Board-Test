import Menu from "../components/Menu";

export default function Dashboard() {
  return (
    <div className="flex h-full">
      <div className="w-1/6 h-full">
        <Menu />
      </div>
      <div>
        <h1>Accueil</h1>
      </div>
    </div>
  );
}
