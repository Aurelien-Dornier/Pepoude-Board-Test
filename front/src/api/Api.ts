import axios from "axios";
import { IUser } from "../@types";
import { apiBaseUrl } from "../api/config";

// Fonction pour créer un compte utilisateur
export const createAccount = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<IUser | null> => {
  try {
    const response = await axios.post<IUser>(
      `${apiBaseUrl}/api/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("createAccount error:", error);
    return null;
  }
};

// Fonction pour connecter un utilisateur
export const loginUser = async (
  email: string,
  password: string
): Promise<{success: boolean, message: string, data: {token: string, user: IUser}}> => {
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