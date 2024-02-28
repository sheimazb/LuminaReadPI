import { Flex, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddPackage: React.FC = () => {
    const toast = useToast();
    const [token, setToken] = useState("");
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        category: string;
        img: File | null; // Spécifiez que img peut être de type File ou null
        langue: string;
        price: string;
    }>({
        title: "",
        description: "",
        category: "",
        img: null,
        langue: "",
        price: "",
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("langue", formData.langue);
            formDataToSend.append("price", formData.price);
            if (formData.img) {
                formDataToSend.append("image", formData.img);
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/api/add-pack",
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data", // Ajout du Content-Type pour indiquer que des fichiers sont envoyés
                    },
                }
            );
            toast({
                title: "Success",
                description: "Added pack successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            console.log("Response:", response.data);
        } catch (error: any) {
            console.error("Error:", error);
            if (error.response && error.response.data.message) {
                toast({
                    title: "Error",
                    description: error.response.data.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to add pack. Please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Flex>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="title"
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
                    placeholder="Category"
                    onChange={handleChange}
                    name="category"
                    value={formData.category}
                />
                <Input
                    placeholder="Langue"
                    onChange={handleChange}
                    name="langue"
                    value={formData.langue}
                />
                <Input
                    placeholder="Price"
                    onChange={handleChange}
                    name="price"
                    value={formData.price}
                />
                <Input type="file" name="image" onChange={handleImageChange} />
                <Button type="submit">Add</Button>
            </form>
        </Flex>
    );
};

export default AddPackage;
