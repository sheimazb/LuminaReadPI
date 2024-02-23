/*import axios from "axios";
import { create } from "zustand";

const BASE_URL = "http://127.0.0.1:8000/api";

interface User {
  userName: string;
  userId: number;
}

interface UserStore {
  user: User | null;
  login: (loginData: LoginData) => Promise<void>;
}

interface LoginData {
  email: string;
  password: string;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: async (loginData: LoginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
      console.log("Response data:", response.data); 
      if (response.status === 200) {
        const { token, userId, userName } = response.data;
        console.log("Token:", token); 
        localStorage.setItem("token", token);
        set({ user: { userName, userId } });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; 
    }
  },
  
}));
*/