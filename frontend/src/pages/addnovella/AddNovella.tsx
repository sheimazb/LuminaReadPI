import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Input,
    Textarea,
    Image,
    Text,
    useToast,
    Flex,
    Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddNovella: React.FC = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>("");
    const url = window.location.href;
    const packId = url.split("/").pop();
    const toast = useToast();
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        img: File | null;
        content: string;
        progress: string;
    }>({
        title: "",
        description: "",
        img: null,
        content: "",
        progress: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const imageInputRef = useRef<HTMLInputElement>(null);
    const initialRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string>("");

    const handleImageClick = () => {
        imageInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);

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
            formDataToSend.append("content", formData.content);
            formDataToSend.append("progress", "hiiii");
            if (formData.img) {
                formDataToSend.append("image", formData.img);
            }

            const response = await axios.post(
                `http://127.0.0.1:8000/api/add-novella/${packId}`, // Inject pack ID into the URL
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response);
            if (response.status === 200) {
                navigate(`/package/${packId}`);
            }
            toast({
                title: "Success",
                description: "Added novella successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error: any) {
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
                    description: "Failed add novella. Please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
            console.error("Error:", error);
        }
    };

    return (
        <Flex w={"90%"} pt={20} mx={"auto"} justifyContent={"center"}>
            <Flex
                minW={"1200px"}
                alignContent={"center"}
                p={4}
                borderRadius={"10px"}
            >
                <Flex flexDirection={"column"} gap={5}>
                    <Text as="b">Add a new novella</Text>
                    <form onSubmit={handleSubmit}>
                        <Box w="550px" onClick={handleImageClick}>
                            {image ? (
                                <Image
                                    borderRadius={10}
                                    minW={"980px"}
                                    objectFit="cover"
                                    boxSize="150px"
                                    src={image}
                                    alt="Selected Image"
                                    className="post-big-border__video is-success anim"
                                    loading="lazy"
                                    data-submit-anim=""
                                />
                            ) : (
                                <Image
                                    borderRadius={10}
                                    minW={"980px"}
                                    border={"1px dashed gray"}
                                    boxSize="150px"
                                    objectFit="cover"
                                    src="https://imgs.search.brave.com/lJY02DRAQPQz8e0trn8NBtuEevCO-is06l7kFIi31IM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9qZXJp/Y2hvd3JpdGVycy5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjIvMDUvd3JpdGlu/Zy1hLWJvb2sxLmpw/Zy53ZWJw"
                                    className="post-big-border__video is-success anim"
                                />
                            )}
                            <input
                                type="file"
                                name="image"
                                ref={imageInputRef}
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </Box>
                        <Flex
                            direction={"column"}
                            justifyContent={"left"}
                        >
                            <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                gap={3}
                            >
                                <label>Title :</label>
                                <Input
                                    w="sm"
                                    mt="2"
                                    ml={12}
                                    onChange={handleChange}
                                    ref={initialRef}
                                    name="title"
                                    value={formData.title}
                                    placeholder="Place the title of the novel"
                                />
                                <label>Description :</label>

                                <Input
                                    w="sm"
                                    mt="2"
                                    onChange={handleChange}
                                    name="description"
                                    value={formData.description}
                                    placeholder="Place the description of the novel"
                                />
                            </Flex>
                            <Flex
                                alignItems={"left"}
                            >
                                <label>Langue :</label>

                                <Input
                                    w="sm"
                                    mt="2"
                                    ml={10}

                                    placeholder="Langue"
                                  
                                />
                               
                            </Flex>
                        </Flex>
                        <Divider mt={8} />
                        <Flex direction={"column"}>
                            <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Text as="b">Content</Text>
                                <Button
                                    colorScheme="blue"
                                    mr={3}
                                    type="submit"
                                    mt={4}
                                >
                                    Save
                                </Button>
                            </Flex>
                            <Textarea
                                w="l"
                                placeholder="Enter novella content..."
                                mt={2}
                                height={100}
                                resize={"horizontal"}
                                onChange={handleChange}
                                name="content"
                                value={formData.content}
                            />
                        </Flex>
                    </form>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AddNovella;
