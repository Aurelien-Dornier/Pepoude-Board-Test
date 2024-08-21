export default function Menu() {
  return (
    <div className="bg-white shadow h-full">
      <ul className="menu bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <li>
          <a>Accueil</a>
        </li>
        <li>
          <a>Commandes</a>
          <ul>
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a>Produits</a>
          <ul>
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a>Utilisateurs</a>
        </li>
      </ul>
    </div>
  );
}
