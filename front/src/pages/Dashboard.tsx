import { Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import Products from "../components/Products";

export default function Dashboard() {
  return (
    <div className="flex fixed h-full w-full">
      <Menu />
      <div>
        <Routes>
          <Route path="/products" element={<Products />}/>
        </Routes>
      </div>
    </div>
  );
}
