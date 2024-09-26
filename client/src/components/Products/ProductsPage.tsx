import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "../../@types";
import { getAllProducts } from "../../api/Api";
import SearchComponent from "./searchProducts";

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        // console.log("Products state updated:", allProducts); // DEBUG √
      } catch (error) {
        console.error("Error in fetchProducts:", error);
        setError("Failed to fetch products.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  //console.log("Current products state:", products); DEBUG √

  return (
    <div className="p-8">
      <h2 className="card-title text-3xl text-gray-900 pb-4">Produits</h2>
      <SearchComponent onSearchResults={setProducts} />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="flex flex-wrap gap-8 bg-white shadow-2xl my-6 p-8 w-full">
          {Array.isArray(products) &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}
