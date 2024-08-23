import { IOrder } from "../../@types";
import { Link } from "react-router-dom";

interface OrderCardProps {
  order: IOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Link to={`/orders/${order.id}`} className="bg-gray-100 p-4 shadow-lg rounded-lg duration-300 hover:shadow-inner hover:bg-white">
        <div className="navbar flex justify-between">
          <p>{order.id}</p>
          <p>{order.status}</p>
          <p>{order.totalAmount}€</p>
          </div>
    </Link>
  );
}
   