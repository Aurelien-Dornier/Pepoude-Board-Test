import { IProduct } from "../../@types";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-800 font-bold">${product.price}</p>
      <Link
        to={`/dashboard/products/${product.id}`}
        className="text-blue-500 hover:underline"
      >
        Voir détails
      </Link>
    </div>
  );
}
