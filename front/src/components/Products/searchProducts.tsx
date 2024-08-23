import { useState } from "react";
import { searchProducts } from "../../api/Api";
import { IProduct } from "../../@types";

export default function SearchComponent({
  onSearchResults,
}: {
  onSearchResults: (results: IProduct[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchProducts(query);
      onSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher des produits..."
        className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        {isLoading ? "Recherche..." : "Rechercher"}
      </button>
    </form>
  );
}
