export default function Menu() {
  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/products">Produits</a>
          </li>
          <li>
            <a href="/orders">Commandes</a>
          </li>
          <li>
            <a href="/users">Utilisateurs</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
