// config.ts
interface Environment {
  PROD: boolean;
  VITE_API_URL?: string;
}

declare global {
  interface ImportMetaEnv extends Environment {}
}

export const apiBaseUrl = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_URL || "https://votre-api-render.onrender.com")
  : "http://localhost:3000";