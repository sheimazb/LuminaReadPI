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

interface User {
    id: number;
    name: string;
    email: string;
    img: string;
    description: string;
    // Ajoutez d'autres propriétés selon vos besoins
}
interface Pack {
    id: number;
    user_id: number;
    title: string;
    description: string;
    category: string;
    img: string;
    langue: string;
    price: string;
    // Ajoutez d'autres propriétés selon vos besoins
}
const Profile: React.FC = () => {
    //Models
    const { isOpen, onOpen, onClose } = useDisclosure();
    //useStatement
    const [packs, setPacks] = useState([]);
    const [imageURL, setImageURL] = useState<string | null>(null);
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
    const [user, setUser] = useState<User>({
        id: 0,
        name: "",
        email: "",
        img: "",
        description: "",
    });
    //useEffectively
    //fetch connected user
    useEffect(() => {
        (async () => await fetchUser())();
    }, []);
    async function fetchUser() {
        const token = localStorage.getItem("token"); // Récupérer le token JWT depuis le stockage local
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUser(response.data.user);
        console.log(response.data.user);
    }

    //Load the packed data according to connected usager
    useEffect(() => {
        (async () => await loadPackData())();
    }, []);

    async function loadPackData(): Promise<void> {
        try {
            const token = localStorage.getItem("token"); // Récupérer le token JWT depuis le stockage local

            const response = await axios.get(
                `http://127.0.0.1:8000/api/packk`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            setPacks(response.data.packs);
            console.log(response.data.packs);
        } catch (error) {
            console.error(
                "Erreur lors du chargement de l'utilisateur :",
                error
            );
        }
    }

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
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("email", formData.email);
            if (formData.img) {
                formDataToSend.append("image", formData.img);
            }
            const token = localStorage.getItem("token"); // Récupérer le token JWT depuis le stockage local

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
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                img: file,
            });
        }
    };
console.log(formData.img)
    return (
        <Box maxW={"1230px"} m={"30px auto"}>
            <Flex flexDirection={"column"} gap={1} alignItems={"left"}>
                <Flex flexDirection={"column"} gap={1} alignItems={"center"}>
                    <Box position="relative" display="inline-block">
                        <Image
                            src={user.img}
                            w={16}
                            h={16}
                            rounded={20}
                            ml={1}
                        />
                    </Box>
                    <Text fontSize={"xl"}>{user.name}</Text>

                    <Text color={"gray.400"} maxW={300} textAlign={"center"}>
                        {user.description}
                    </Text>
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
                                            <Box
                                                display={"flex"}
                                                justifyContent={"center"}
                                            >
                                                
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
                                                                borderRadius:
                                                                    "50%",
                                                                backgroundColor:
                                                                    "transparent",
                                                                border: "1px dashed",
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "center",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    fontSize:
                                                                        "24px",
                                                                    color: "white",
                                                                }}
                                                            >
                                                                +
                                                            </span>
                                                        </div>
                                                        <label htmlFor="profile-image-input">
                                                            Edit profile photo
                                                        </label>
                                                    </label>
                                                )}
                                               <input
        type="file"
        name="image"
        onChange={handleImageChange}
    />
                                            </Box>
                                            <Text>Edit name</Text>
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
                {packs.map((pack: Pack, index: number) => (
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
                           src={pack.img}
                           maxH={120}
                            w={"100%"}
                            objectFit={"cover"}
                            rounded={5}
                        />

                        <Text as={"b"} mt={2}>
                        {pack.title}
                        </Text>

                        <Text color={"gray.400"}>
                        {pack.description}

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
