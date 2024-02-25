import { Box, Flex, Image, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import React from "react";

const AddPackage: React.FC = () => {
    const [token, setToken] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        img: "",
        langue: "",
        price: "",
    });
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/add-pack",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Utiliser le token dans l'en-tête Authorization
                    },
                }
            );
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    /*
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };
*/
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
                    placeholder="descripation"
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                />
                <Input
                    placeholder="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
                <Input
                    placeholder="langue"
                    value={formData.langue}
                    onChange={handleChange}
                    name="langue"
                />
                <Input
                    placeholder="price"
                    value={formData.price}
                    onChange={handleChange}
                    name="price"
                />
                <Input
                    type="file"
                    name="image"
                    value={formData.img}
                    onChange={handleChange}
                />
                <Button type="submit">Add</Button>
            </form>
        </Flex>
    );
};

export default AddPackage;
