import axios, { AxiosError } from "axios";
import { IUser, ICategory, IProduct, IOrder } from "../@types";
import { apiBaseUrl } from "../api/config";

//+++++AUTH+++++
// Fonction pour créer un compte utilisateur
export const createAccount = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
  data: { user: IUser } | null;
}> => {
  try {
    const response = await axios.post<{ user: IUser }>(
      `${apiBaseUrl}/api/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return {
      success: true,
      message: "Account created successfully",
      data: response.data,
    };
  } catch (error) {
    let errorMessage = "An error occurred during registration";

    if (error instanceof AxiosError && error.response) {
      // Capture et affiche les détails spécifiques de l'erreur de validation
      const validationErrors =
        error.response.data.errors ||
        error.response.data.message ||
        error.message;
      errorMessage = validationErrors;

      console.error("createAccount error details:", validationErrors); // Affiche les détails d'erreur
    }

    return { success: false, message: errorMessage, data: null };
  }
};

// Fonction pour connecter un utilisateur
export const loginUser = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  message: string;
  data: { token: string; user: IUser };
}> => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/api/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("loginUser error:", error);
    throw error;
  }
};

//+++++PRODUCTS+++++
// Fonction pour obtenir tous les produits
export async function getAllProducts() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get<{
      success: boolean;
      message: string;
      data: IProduct[];
    }>(`${apiBaseUrl}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    // console.log(token); DEBUG √
    // console.log("API res.data", res.data); // DEBUG √
    return res.data.data;
  } catch (error) {
    console.error("getAllProducts error:", error);
    throw error;
  }
}

// Fonction pour obtenir un produit par son id
export const getProductById = async (id: number): Promise<IProduct | null> => {
  try {
    const res = await axios.get<{
      success: boolean;
      message: string;
      data: IProduct & { category: ICategory };
    }>(`${apiBaseUrl}/api/products/${id}`, {
      withCredentials: true,
    });
    console.log("API res.data", res.data); // DEBUG √
    return res.data.data;
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
};

// function pour supprimer un produit par son id
export async function deleteProduct(id: string) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete<{
      success: boolean;
      message: string;
      data: IProduct & { category: ICategory };
    }>(`${apiBaseUrl}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.error("deleteProduct error:", error);
    throw error;
  }
}

// function pour ajouter un produit
export async function addProduct(product: IProduct) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post<{
      success: boolean;
      message: string;
      data: IProduct & { category: ICategory };
    }>(`${apiBaseUrl}/api/products`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.error("addProduct error:", error);
    throw error;
  }
}

//+++++CATEGORIES+++++
// Fonction pour obtenir toutes les categories
export const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    const res = await axios.get<{
      success: boolean;
      message: string;
      data: ICategory[];
    }>(`${apiBaseUrl}/api/categories`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.error("getAllCategories error:", error);
    return [];
  }
};

//+++++ORDERS+++++
// Fonction pour obtenir toutes les commandes
export async function getAllOrders() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get<{
      success: boolean;
      message: string;
      data: IOrder[];
    }>(`${apiBaseUrl}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    // console.log(token); DEBUG √
    // console.log("API res.data", res.data); // DEBUG √
    return res.data.data;
  } catch (error) {
    console.error("getAllOrders error:", error);
    throw error;
  }
}