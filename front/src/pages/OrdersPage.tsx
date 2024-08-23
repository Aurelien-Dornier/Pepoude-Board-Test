import OrderCard from "../components/Orders/OrderCard";
import { IOrder } from "../@types";
import { useEffect, useState } from "react";
import { getAllOrders } from "../api/Api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const allOrders = async () => {
      try {
        const orders = await getAllOrders();
        setOrders(Array.isArray(orders) ? orders : []); // Vérifie que c'est bien un tableau
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    allOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="p-8">
      <h2 className="card-title text-3xl text-gray-900 pb-4">Commandes</h2>
      <div className="flex flex-col gap-6 bg-white shadow-2xl my-6 p-8 w-full">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
