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
    Stack,
    CardBody,
    Heading,
    Card,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const Package = () => {
    const [novellas, setNovellas] = useState([]);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const { id } = useParams(); // Obtenir le paramètre 'id' depuis l'URL
    const userId = localStorage.getItem("id");
    const [packUserId, setPackUserId] = useState(null);
    const handleNavigate = () => {
        navigate(`/addnovella/${id}`); // Naviguer vers AddNovella avec l'ID du pack
    };

    const handleRatingChange = (event:any) => {
        setRating(event.target.value);
    };

    const handleSubmitRating = () => {
        const token = localStorage.getItem("token"); // Récupérer le token JWT depuis le stockage local

        axios
            .post(
                `http://127.0.0.1:8000/api/pack/review/${id}`,
                { rating: rating },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response.data); // Afficher la réponse du backend
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi du rating:", error);
            });
    };

    useEffect(() => {
        const loadNovellas = async () => {
            try {
                const result = await axios.get(
                    `http://127.0.0.1:8000/api/pack/${id}/novellas`
                ); // Utiliser les littéraux de gabarits pour inclure 'id' dans l'URL
                setNovellas(result.data.novellas);
            } catch (error) {
                console.error("Erreur lors du chargement des novellas:", error);
            }
        };

        loadNovellas();
    }, [id]); // Inclure 'id' en tant que dépendance dans useEffect pour déclencher l'effet lorsque 'id' change

    const handleCheckNovella = (novella:any):void => {
        navigate(`/novella/${novella.id}`);
    };

    return (
        <Box w={"90%"} pt={20} mx={"auto"}>
            <Flex flexDirection={"column"} gap={2}>
                <Flex
                    h={300}
                    w={"100%"}
                    rounded={20}
                    bg={"gray.700"}
                    position={"relative"}
                    overflow={"hidden"}
                >
                    <Image
                        src="https://i.gyazo.com/933ed1aa06f63a98d12891af67fbcee0.jpg"
                        w={"100%"}
                        objectFit={"cover"}
                    />
                    <Box
                        position={"absolute"}
                        top={0}
                        bottom={0}
                        left={0}
                        right={0}
                        bgGradient="linear(to-t,  #1b202d , transparent 70% )"
                    />
                    <Box position={"absolute"} bottom={4} left={4}>
                        <Image
                            src="https://i.gyazo.com/df168e15d60588f5f47e2faa9e9cae6c.png"
                            w={12}
                            h={12}
                            rounded={20}
                            ml={1}
                        />
                        <Text fontSize={"2xl"}>Fantasy Books</Text>
                        <Text>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                        </Text>
                        <Box>
                    <Input
                        type="number"
                        value={rating}
                        onChange={handleRatingChange}
                    />
                    <Button onClick={handleSubmitRating}>Envoyer Rating</Button>
                </Box>
                        <Flex
                            alignItems={"center"}
                            gap={"5px"}
                            mt={2}
                            color={"yellow.300"}
                        >
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </Flex>
                    </Box>
                    <Box position={"absolute"} mt={5} bottom={4} right={2}>
    <Button onClick={handleNavigate}>
        Add Novella
    </Button>

    <Button ml={3} colorScheme="cyan" size={"sm"}>
        Buy This Pack
    </Button>
</Box>
                </Flex>
                <Flex flexDirection={"column"} gap={3} mx={3}>
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
                    <Flex>
                        <Button mr={1} size={"sm"} rounded={20}>
                            Blog
                        </Button>
                        <Button mr={1} size={"sm"} rounded={20}>
                            Book
                        </Button>
                        <Button mr={1} size={"sm"} rounded={20}>
                            Music
                        </Button>
                        <Button mr={1} size={"sm"} rounded={20}>
                            More
                        </Button>
                    </Flex>
                </Flex>
                <Wrap w={"100%"} p={2}>
                    {novellas.map((novella: any, index: number) => (
                        <Card
                            maxW="270px"
                            key={index}
                            bg={"transparent"}
                            border={"var(--bordercolor) solid 1px "}
                            p={0}
                        >
                            <CardBody>
                                <Image
                                    src={novella.img}
                                    alt="Green double couch with wooden legs"
                                    borderRadius="lg"
                                    w={"100%"}
                                    h={160}
                                />
                                <Stack mt="3" spacing="1">
                                    <Heading size="md">{novella.title}</Heading>
                                    <Text color={"gray.300"} fontSize={"sm"}>
                                        {novella.description}
                                    </Text>
                                    <Button mt={2} size={"sm"}
                                    onClick={() => handleCheckNovella(novella)}
                                    >
                                        Check novella
                                    </Button>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </Wrap>
            </Flex>
        </Box>
    );
};

export default Package;
