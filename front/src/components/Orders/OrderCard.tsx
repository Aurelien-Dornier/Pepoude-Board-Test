import { IOrder } from "../../@types";

interface OrderCardProps {
  order: IOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
        <div className="navbar bg-gray-100">
          <p>{order.id}</p>
          <p>{order.status}</p>
          <p>{order.totalAmount}</p>
          </div>
  );
}
   