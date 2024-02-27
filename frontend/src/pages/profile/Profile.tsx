import {
    Box,
    Flex,
    Text,
    Image,
    Button,
    Wrap,
    Input,
    InputGroup,
    InputRightElement,
    Tag,
    TagLabel,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa"; // Import FaPlus for the add button
const Profile: React.FC = () => {
    const [token, setToken] = useState("");
    const [packs, setPacks] = useState([]);
    useEffect(() => {
        LoadPack();
    }, []);
    
    async function LoadPack() {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/packk", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            });
            setPacks(result.data.pack);
            console.log(result.data.pack);
        } catch (error) {
            console.error("Error loading packs:", error);
        }
    }
   console.log('papa',packs);
    
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        email: string;
        img: File | null; // Spécifiez que img peut être de type File ou null
    }>({
        name: "",
        description: "",
        email: "",
        img: null,
    });
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
            const url = URL.createObjectURL(file);
            setImageURL(url);
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
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("email", formData.email);
            if (formData.img) {
                formDataToSend.append("image", formData.img);
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/api/editUser",
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data", // Ajout du Content-Type pour indiquer que des fichiers sont envoyés
                    },
                }
            );

            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const range = (n: number) => [...Array(n).keys()];

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    const [user, setUser] = useState<any>();

    useEffect(() => {
        (async () => await Load())();
    }, []);
    async function Load() {
        const response = await axios.get("http://127.0.0.1:8000/api/getUSer", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        setUser(response.data);
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageURL, setImageURL] = useState<string | null>(null);
    return (
        <Box maxW={"1230px"} m={"30px auto"}>
            <Flex flexDirection={"column"} gap={1} alignItems={"left"}>
                <Flex flexDirection={"column"} gap={1} alignItems={"center"}>
                    <Box position="relative" display="inline-block">
                        <Image src="" w={16} h={16} rounded={20} ml={1} />
                    </Box>
                    <Text fontSize={"xl"}></Text>

                    <Text
                        color={"gray.400"}
                        maxW={300}
                        textAlign={"center"}
                    ></Text>
                    <Flex gap={1}>
                        <Tag size="md" colorScheme="cyan" borderRadius="full">
                            <TagLabel>Pro</TagLabel>
                        </Tag>
                        <Tag size="md" colorScheme="orange" borderRadius="full">
                            <TagLabel>Good Reader</TagLabel>
                        </Tag>
                        <Tag size="md" colorScheme="green" borderRadius="full">
                            <TagLabel>Professional Writer</TagLabel>
                        </Tag>
                        <Tag size="md" colorScheme="purple" borderRadius="full">
                            <TagLabel>High Tech</TagLabel>
                        </Tag>
                    </Flex>
                    <Button onClick={onOpen}>Edit</Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent mt={"100px"}>
                            <ModalHeader> Edit Profil</ModalHeader>
                            <ModalCloseButton />
                            <form onSubmit={handleSubmit}>
                                <ModalBody>
                                    <Box>
                                        <Flex gap={1} direction={"column"}>
                                        <Box display={"flex"} justifyContent={"center"}>
            {imageURL ? (
                <img
                    src={imageURL}
                    alt="Profile"
                    style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
            ) : (
                <label htmlFor="profile-image-input">
                    <div
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            backgroundColor: "transparent",
                            border: "1px dashed",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                    >
                        <span style={{ fontSize: "24px", color: "white" }}>+</span>
                    </div>
            <label htmlFor="profile-image-input">Edit profile photo</label>

                </label>
            )}
            <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
            />
        </Box>
                                            <label>Edit name</label>
                                            <Input
                                                placeholder=" name"
                                                onChange={handleChange}
                                                name="name"
                                            />
                                            <label>Edit e-mail</label>

                                            <Input
                                                placeholder="Edit e-mail"
                                                onChange={handleChange}
                                                name="email"
                                            />
                                            <label>Add description</label>

                                            <Input
                                                placeholder="Here is a sample description"
                                                onChange={handleChange}
                                                name="description"
                                            />
                                        </Flex>
                                    </Box>
                                </ModalBody>

                                <ModalFooter>
                                    <Button mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" colorScheme="blue">
                                        Save
                                    </Button>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                    </Modal>
                </Flex>
            </Flex>

            <Flex mt={5}>
                <InputGroup size="md">
                    <Input
                        borderColor={"gray.700"}
                        placeholder="Search section"
                    />
                    <InputRightElement>
                        <Button size="xs" mr={1} color={"white"}>
                            <FaSearch />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <Wrap minH={500} mt={3}>
                {range(10).map((index) => (
                    <Box
                        key={index}
                        h={280}
                        w={300}
                        rounded={10}
                        border={" solid 1px "}
                        borderColor={"gray.600"}
                        overflow={"hidden"}
                        p={2}
                    >
                        <Image
                            src="https://i.gyazo.com/933ed1aa06f63a98d12891af67fbcee0.jpg"
                            maxH={120}
                            w={"100%"}
                            objectFit={"cover"}
                            rounded={5}
                        />
                        <Text as={"b"} mt={2}>
                            Lorem ipsum dolor sit amet adipi .
                        </Text>
                        <Text color={"gray.400"}>
                            Lorem ipsum dolor sit amet adipi amet adipi .
                        </Text>
                        <Flex
                            alignItems={"center"}
                            gap={"5px"}
                            color={"yellow.300"}
                            fontSize={"xs"}
                            mt={3}
                        >
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </Flex>
                        <Button mt={3} w={"100%"}>
                            Check
                        </Button>
                    </Box>
                ))}
            </Wrap>
        </Box>
    );
};

export default Profile;
