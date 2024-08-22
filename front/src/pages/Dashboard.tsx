import { Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import Products from "../components/Products";
import Users from "../components/Users";
import Orders from "../components/Orders";
import Home from "../components/Home";

export default function Dashboard() {
  return (
    <div className="flex grow">
      <div>
      <Menu />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/users" element={<Users/>}/>
        </Routes>
      </div>
    </div>
  );
}
