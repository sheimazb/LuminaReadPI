import React, { useEffect } from "react";
import {
    Box,
   
    Button,
   
    Input,
} from "@chakra-ui/react";
import {  useState } from "react";
import axios from "axios";

const AddNovella:React.FC = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        setToken(storedToken);
    }
}, []);
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        img: File | null; // Spécifiez que img peut être de type File ou null
        content: string;
        progress: string;
    }>({
        title: "",
        description: "",
        img: null,
        content: "",
        progress: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Extract pack ID from URL
            const url = window.location.href;
            const packId = url.split("/").pop(); // Assuming the pack ID is at the end of the URL

            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("content", formData.content);
            formDataToSend.append("progress", formData.progress);
            if (formData.img) {
                formDataToSend.append("image", formData.img);
            }

            const response = await axios.post(
                `http://127.0.0.1:8000/api/add-novella/${packId}`, // Inject pack ID into the URL
                formDataToSend,
                {
                  headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
                
            );

            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                img: file,
            });
        }
    };
    return (
        <Box
            className="container"
            w="600px"
            margin="3rem auto"
            bgPosition="0 0"
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            flexDirection="column"
            justifyContent="flex-end"
            padding="3rem"
            display="flex"
        >
            <form onSubmit={handleSubmit}>
            <Input
                    placeholder="Title"
                    onChange={handleChange}
                    name="title"
                    value={formData.title}
                />
                <Input
                    placeholder="Description"
                    onChange={handleChange}
                    name="description"
                    value={formData.description}
                />
                <Input
                    placeholder="Langue"
                    onChange={handleChange}
                    name="content"
                    value={formData.content}
                />
                <Input
                    placeholder="Price"
                    onChange={handleChange}
                    name="progress"
                    value={formData.progress}
                />
                <Input
                    type="file"
                    name="image"
                    onChange={handleImageChange}

                />
                <Button type="submit">Add</Button>

            </form>

        </Box>
    );
};

export default AddNovella;
