import { Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import Products from "../components/Products";
import Users from "../components/Users";
import OrdersPage from "../pages/OrdersPage";
import HomePage from "./HomePage";
import PrivateRoute from "../components/PrivateRoute";

export default function Dashboard({ isAuthenticated }: { isAuthenticated: boolean }) {

  return (
    <div className="flex grow">
      <div>
      <Menu />
      </div>
      <div className="w-full">
        <Routes>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
