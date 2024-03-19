import axios from "axios";
import { create } from "zustand";

const BASE_URL = "http://127.0.0.1:8000/api";

interface User {
    name: string;
    id: number;
}

interface UserStore {
    user: User | null;
    login: (loginData: LoginData) => Promise<void>;
    logout: () => void;
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
            if (response.status === 201 && response.data.success) {
                const { id, auth_token, name } = response.data.data;
                console.log("Token:", auth_token);
                localStorage.setItem("token", auth_token);
                set({ user: { name, id } });
            }
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    },
    
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("expiresIn");
        set({ user: null });
    },
}));
