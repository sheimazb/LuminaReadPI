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
    Link,
    Card,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa"; // Import FaPlus for the add button
import defaultPic from "../../assets/default-profile.jpg";
import AddPackage from "../addpackage/AddPackage";
import { BsArrowRight } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
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
    const handleClickShow = (pack: any) => {
        navigate(`/package/${pack.id}`);
    };
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
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageURL(url);
            setFormData({
                ...formData,
                img: file,
            });
        }
    };

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://127.0.0.1:8000/api/packk?search=${searchQuery}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setSearchResults(response.data.packs);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleChangeSearch = (e: any) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Box  pt={20} ml={"auto"} mr={"auto"} bg={'black'}>
            <Flex flexDirection={"column"} gap={1} alignItems={"left"}>
                <Flex flexDirection={"column"} gap={1} alignItems={"center"}>
                    <Box position="relative" display="inline-block">
                        <Image
                            src={user.img ? user.img : defaultPic}
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
                    <Flex gap={3} alignItems={"center"}>
                        <Button onClick={onOpen} size={"sm"} bg="gray">
                            Edit
                        </Button>
                        <AddPackage />
                    </Flex>

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
                                                    id="profile-image-input"
                                                    type="file"
                                                    name="image"
                                                    style={{ display: "none" }}
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
                <InputGroup size="md" ml={100} mr={100}>
                    <Input
                        borderColor={"teal.700"}
                        placeholder="Search section"
                        borderRadius={"20px"}
                        bg={"black"}
                        value={searchQuery}
                        name="search"
                        onChange={handleChangeSearch}
                    />
                    <InputRightElement>
                        <Button
                            size="xs"
                            mr={1}
                            color={"white"}
                            onClick={handleSearch}
                        >
                            <FaSearch />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <Wrap minH={500} ml={60}>
                {searchQuery.length === 0
                    ? // If searchResults is empty, display all packs
                      packs.map((pack: Pack, index: number) => (
                          <Card
                              w="300px"
                              key={index}
                              m={3}
                              h={"390px"}
                              borderRadius={"10px"}
                              border={"1px solid "}
                              borderColor={"teal.700"}
                              bg={"transparent"}
                              p={3}
                          >
                              <Flex direction={"column"} gap={2}>
                                  <Image
                                      borderRadius={"30px"}
                                      w={"300px"}
                                      h={"200px"}
                                      objectFit="cover"
                                      src={pack.img}
                                      alt="Dan Abramov"
                                  />
                                  <Flex
                                      alignItems={"center"}
                                      justifyContent={"right"}
                                      gap={6}
                                  >
                                      <Flex alignItems={"center"} gap={1}>
                                          <CiCalendarDate color={"cyan"} />{" "}
                                          <Text color={"gray.400"}>
                                              12/05/2012
                                          </Text>
                                      </Flex>
                                  </Flex>
                                  <Text as={"b"} fontSize={"xl"}>
                                      {pack.title}
                                  </Text>
                                  <Text color={"gray"}>{pack.description}</Text>
                                  <Text
                                      display={"flex"}
                                      alignItems={"center"}
                                      fontSize={"sm"}
                                      color={"yellow.400"}
                                      gap={1}
                                  >
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                  </Text>
                                  <Flex
                                      alignItems={"center"}
                                      gap={1}
                                      justifyContent={"space-between"}
                                  >
                                      <Flex alignItems={"center"} gap={1}>
                                          <Link
                                              color={"cyan"}
                                              onClick={() =>
                                                  handleClickShow(pack)
                                              }
                                          >
                                              Show{" "}
                                          </Link>
                                          <BsArrowRight color="cyan" />
                                      </Flex>
                                  </Flex>
                              </Flex>
                          </Card>
                      ))
                    : // If searchResults is not empty, display search results
                      searchResults.map((pack: Pack, index: number) => (
                          <Card
                              w="300px"
                              key={index}
                              m={3}
                              h={"380px"}
                              borderRadius={"10px"}
                              border={"1px solid "}
                              borderColor={"gray.700"}
                              bg={"transparent"}
                              p={3}
                          >
                              <Flex direction={"column"} gap={2}>
                                  <Image
                                      borderRadius={"30px"}
                                      w={"300px"}
                                      h={"200px"}
                                      objectFit="cover"
                                      src={pack.img}
                                      alt="Dan Abramov"
                                  />
                                  <Flex
                                      alignItems={"center"}
                                      justifyContent={"right"}
                                      gap={6}
                                  >
                                      <Flex alignItems={"center"} gap={1}>
                                          <CiCalendarDate color={"cyan"} />{" "}
                                          <Text color={"gray.400"}>
                                              12/05/2012
                                          </Text>
                                      </Flex>
                                  </Flex>
                                  <Text as={"b"} fontSize={"xl"}>
                                      {pack.title}
                                  </Text>
                                  <Text color={"gray"}>{pack.description}</Text>
                                  <Text
                                      display={"flex"}
                                      alignItems={"center"}
                                      fontSize={"sm"}
                                      color={"yellow.400"}
                                      gap={1}
                                  >
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                  </Text>
                                  <Flex
                                      alignItems={"center"}
                                      gap={1}
                                      justifyContent={"space-between"}
                                  >
                                      <Flex alignItems={"center"} gap={1}>
                                          <Link
                                              color={"cyan"}
                                              onClick={() =>
                                                  handleClickShow(pack)
                                              }
                                          >
                                              Show{" "}
                                          </Link>
                                          <BsArrowRight color="cyan" />
                                      </Flex>
                                  </Flex>
                              </Flex>
                          </Card>
                      ))}
            </Wrap>
        </Box>
    );
};

export default Profile;
