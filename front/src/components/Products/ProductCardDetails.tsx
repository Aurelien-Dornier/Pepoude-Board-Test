import { useParams } from "react-router-dom";
import { IProduct } from "../../@types";
import { useEffect, useState } from "react";

interface ProductDetailsProps {
  product: IProduct;
}

export default function ProductDetails() {
  const { id } = useParams();
  return <div>ProductDetails</div>;
}
