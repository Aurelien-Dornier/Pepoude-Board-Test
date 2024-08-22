import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../@types";
import { getProductById } from "../../api/Api";

export default function ProductDetails() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      try {
        setIsLoading(true);
        const fetchedProduct = await getProductById(parseInt(id, 10));
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error in loadProduct:", error);
        setError("Failed to fetch product.");
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-800 font-bold">${product.price}</p>
    </div>
  );
}
