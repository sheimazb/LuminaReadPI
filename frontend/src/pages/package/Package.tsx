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
    useColorMode,
    Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const Package = () => {
    const [novellas, setNovellas] = useState([]);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const { id } = useParams(); // Obtenir le paramètre 'id' depuis l'URL
    const userId = localStorage.getItem("id");
const uId =parseInt(userId);
    const [packUserId, setPackUserId] = useState(null);
    const handleNavigate = () => {
        navigate(`/addnovella/${id}`);
    };
    const handleBackNavigate = () => {
        navigate("/marketplace");
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmitRating = () => {
        const token = localStorage.getItem("token");

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
                console.log(response.data);
                console.log("Submitted rating:", rating);
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
                );
                setNovellas(result.data.novellas);
            } catch (error) {
                console.error("Erreur lors du chargement des novellas:", error);
            }
        };

        loadNovellas();
    }, [id]); // Inclure 'id' en tant que dépendance dans useEffect pour déclencher l'effet lorsque 'id' change

    //get user id de pack d'aprés le pack id que se trouve dans l URL
    useEffect(() => {
        const loadUserID = async () => {
            try {
                const result = await axios.get(
                    `http://127.0.0.1:8000/api/packsBy/${id}`
                );
                setPackUserId(result.data.pack.user_id);
            } catch (error) {
                console.error(error);
            }
        };

        loadUserID();
    }, [id]);
    const [packId, setPackId] = useState("");
    useEffect(() => {
        const loadPackID = async () => {
            try {
                const result = await axios.get(
                    `http://127.0.0.1:8000/api/packsBy/${id}`
                );
                setPackId(result.data.pack);
            } catch (error) {
                console.error(error);
            }
        };

        loadPackID();
    }, [id]);

    const handleCheckNovella = (novella: any): void => {
        navigate(`/novella/${novella.id}`);
    };
    const { colorMode } = useColorMode();
    const [averageRating, setAverageRating] = useState(1);
    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/pack/${id}/average-rating`
                );
                // Si la réponse est vide ou si elle renvoie une erreur 404, définir averageRating sur 0
                if (!response.data) {
                    setAverageRating(1);
                } else {
                    setAverageRating(response.data);
                }
            } catch (error) {
                // Si une erreur se produit, définir averageRating sur 0
                console.error("Error fetching average rating:", error);
                setAverageRating(0);
            }
        };

        fetchAverageRating();
    }, [id]);
    console.log('test',packId.user_id);
    console.log('test2',uId);

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
                    <Image src={packId.img} w={"100%"} objectFit={"cover"} />
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
                        <Text fontSize={"2xl"}>{packId.title}</Text>
                        <Text>{packId.description}</Text>
                    </Box>
                    <Box position={"absolute"} mt={5} bottom={4} right={2}>
                        {userId == packUserId && (
                            <Button onClick={handleNavigate}>
                                Add Novella
                            </Button>
                        )}
                        <Button ml={3} colorScheme="cyan" size={"sm"}>
                            Buy This Pack
                        </Button>
                    </Box>
                </Flex>
                <Flex gap={5} justifyContent={"space-between"}>
                    <Flex direction={"column"} w={"1200px"}>
                        <Text
                            as={"b"}
                            fontSize={"xl"}
                            color={
                                colorMode === "light" ? "cyan.900" : "gray.300"
                            }
                        >
                            Novellas
                        </Text>
                       
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
                                            <Heading size="md">
                                                {novella.title}
                                            </Heading>
                                            <Text
                                                color={"gray.300"}
                                                fontSize={"sm"}
                                            >
                                                {novella.description}
                                            </Text>
                                            {packId.packStatus !== 1  && (
    <Button
        mt={2}
        size={"sm"}
        onClick={() => handleCheckNovella(novella)}
    >
        Check novella
    </Button>
)}
                                        </Stack>
                                    </CardBody>
                                </Card>
                            ))}
                        </Wrap>
                    </Flex>
                    <Flex
                        direction={"column"}
                        border={"1px solid"}
                        borderColor={"gray.700"}
                        borderRadius={"5"}
                        p={3}
                        w={"450px"}
                        gap={3}
                    >
                        <Text
                            as={"b"}
                            fontSize={"xl"}
                            textAlign={"left"}
                            color={
                                colorMode === "light" ? "cyan.900" : "gray.300"
                            }
                        >
                            Customer reviews & ratings
                        </Text>
                        <Flex justifyContent={"center"}>
                            {averageRating !== undefined &&
                            averageRating !== null &&
                            averageRating !== 0 ? (
                                <Flex
                                    gap={3}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                >
                                    <FaStar color="yellow" fontSize={"50px"} />
                                    <Text as={"b"} fontSize={"50px"}>
                                      
                                        {averageRating ? "0":averageRating.toFixed(1) }
                                       
                                    </Text>
                                </Flex>
                            ) : (
                                <Text>Loading average rating...</Text>
                            )}
                        </Flex>
                        <Divider />
                        <Flex
                            direction={"column"}
                            gap={5}
                            justifyContent={"center"}
                        >
                            <StarRating
                                totalStars={5}
                                onChange={handleRatingChange}
                            />
                            <Button onClick={handleSubmitRating}>
                                Submit Rating
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex></Flex>
            </Flex>
            <Box>
                <Button onClick={() => handleBackNavigate()}>Back</Button>
            </Box>
        </Box>
    );
};

export default Package;
