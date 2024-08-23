import { Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import Products from "../components/Products";
import Users from "../components/Users";
import OrdersPage from "../pages/OrdersPage";
import HomePage from "./HomePage";
import OrderDetails from "../components/Orders/OrderDetails";

export default function Dashboard() {
  return (
    <div className="flex grow">
      <div>
        <Menu />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}
