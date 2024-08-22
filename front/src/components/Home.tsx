export default function Home() {
  return (
    <div className="p-8">
      <h2 className="card-title text-3xl text-gray-900 pb-4">Accueil</h2>
      <div className=" bg-white shadow-2xl my-6 p-8">
        <h3 className="card-title pb-6">Dernières commandes</h3>
        <div className="flex flex-col gap-4">
          <div className="navbar bg-gray-100">Commande</div>
          <div className="navbar bg-gray-100">Commande</div>
          <div className="navbar bg-gray-100">Commande</div>
        </div>
      </div>

      <div className="bg-white shadow-2xl my-6 p-8">
        <h3 className="card-title pb-6">Derniers produits</h3>
        <div className="flex flex-wrap gap-8">
          <div className="card bg-gray-100 size-56">Produit</div>
          <div className="card bg-gray-100 size-56">Produit</div>
          <div className="card bg-gray-100 size-56">Produit</div>
        </div>
      </div>

      <div className="bg-white shadow-2xl my-6 p-8">
        <h3 className="card-title pb-6">Derniers utilisateurs</h3>
        <div className="flex flex-wrap gap-8">
          <div className="card bg-gray-100 size-16">User</div>
          <div className="card bg-gray-100 size-16">User</div>
          <div className="card bg-gray-100 size-16">User</div>
        </div>
      </div>
    </div>
  );
}
