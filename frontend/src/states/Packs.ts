import axios from "axios";

const BASE_URL = "http://localhost:4401/api";
export const AddPack = async () => {
    try {
  
      const response = await axios.post(
        `${BASE_URL}/category/`
      );
      return response.data;
    } catch (error) {
      console.error("Error adding category to user:", error);
      throw new Error("Failed to add category to user");
    }
  };