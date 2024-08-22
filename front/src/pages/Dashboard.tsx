import { Routes, Route } from "react-router-dom";

// Components
import Menu from "../components/Menu";
import ProductsPage from "../components/Products/ProductsPage";
import Users from "../components/Users";
import Orders from "../components/Orders";
import ProductDetails from "../components/Products/ProductCardDetails";
import AddProductsPage from "../components/Products/addProductsPage";

export default function Dashboard() {
  return (
    <div className="flex grow">
      <div>
        <Menu /> // menu sur la gauche
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-products" element={<AddProductsPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}
