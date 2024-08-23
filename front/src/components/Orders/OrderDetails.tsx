import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IOrder } from "../../@types";
import { getOrderById } from "../../api/Api";

export default function OrderDetails() {
  const navigate = useNavigate(); // navigation niveau -1
  const [order, setOrder] = useState<IOrder | null>(null); // produit
  const { id } = useParams<{ id: string }>(); // paramètres de l'URL
  const [isLoading, setIsLoading] = useState(true); // chargement
  const [error, setError] = useState<string | null>(null); // erreur

  useEffect(() => {
    async function loadOrder() {
      if (!id) return;
      try {
        setIsLoading(true);
        const fetchedOrder = await getOrderById(parseInt(id, 10));
        if (fetchedOrder) {
          setOrder(fetchedOrder);
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
    loadOrder();
  }, [id]);
  // navigation niveau -1
  const handleBack = () => {
    navigate(-1);
  };
  

  if (isLoading) return <div>Loading...</div>; // chargement
  if (error) return <div>Error: {error}</div>; // erreur
  if (!order) return <div>Order not found</div>; // produit non trouvé

  return (
    <div className="p-8">
      <h2 className="card-title text-3xl text-gray-900 pb-4">Commande nº {order.id}</h2>
      <div className="flex flex-col gap-6 bg-white shadow-2xl my-6 p-8 w-full">
        <p>{order.status}</p>
        <p>{order.totalAmount}€</p>
        </div>
        <button onClick={handleBack} className="btn">Retour</button>
    </div>
  );
}