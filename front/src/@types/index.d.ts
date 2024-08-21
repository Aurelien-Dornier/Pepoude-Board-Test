export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface IOrder {
  id: number;
  status: string;
  totalAmount: number;
}

export interface IOrderProduct {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}

export interface ICategory {
  id: number;
  name: string;
}