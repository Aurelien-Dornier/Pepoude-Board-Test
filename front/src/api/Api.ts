import axios, { AxiosError } from "axios";
import { IUser } from "../@types";
import { apiBaseUrl } from "../api/config";

// Fonction pour créer un compte utilisateur
export const createAccount = async (data: {
  username: string;
  email: string;
  password: string;
  
}): Promise<{ success: boolean; message: string; data: { user: IUser } | null }> => {
  try {
    const response = await axios.post<{ user: IUser }>(
      `${apiBaseUrl}/api/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return { success: true, message: "Account created successfully", data: response.data };
  } catch (error) {
    let errorMessage = "An error occurred during registration";

    if (error instanceof AxiosError && error.response) {
      // Capture et affiche les détails spécifiques de l'erreur de validation
      const validationErrors = error.response.data.errors || error.response.data.message || error.message;
      errorMessage = validationErrors;

      console.error("createAccount error details:", validationErrors);  // Affiche les détails d'erreur
    }

    return { success: false, message: errorMessage, data: null };
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