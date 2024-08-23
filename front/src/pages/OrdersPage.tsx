import OrderCard from "../components/Orders/OrderCard";
import { IOrder } from "../@types";
import { useEffect, useState } from "react";
import { getAllOrders } from "../api/Api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function allOrders() {
      try {
        setLoading(true);
        const orders = await getAllOrders();
        setOrders(orders);
      } catch (error) {
        setError("Failed to fetch orders");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
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
        {Array.isArray(orders) &&
          orders.map((order) => <OrderCard key={order.id} order={order} />)}
      </div>
    </div>
  );
}
