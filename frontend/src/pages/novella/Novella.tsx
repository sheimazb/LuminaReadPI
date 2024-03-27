import { useEffect, useState } from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import axios from "axios";

interface Novella {
    id: number;
    title: string;
    description: string;
    img: string; // Corrected img type
}

const Novella = () => {
    const { id } = useParams<{ id: string }>(); // Ensure id is of type string

    const [novella, setNovella] = useState<Novella | null>(null); // Changed to single novella state

    useEffect(() => {
        const loadNovella = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/novellas/${id}`
                );
                setNovella(response.data); // Set single novella
            } catch (error) {
                console.error("Erreur lors du chargement de la novella:", error);
            }
        };

        loadNovella();
    }, [id]); // Include id in dependency array

    // Move console.log inside useEffect for better placement

    return (
        <Flex
            w={"1200px"}
            pt={20}
            ml={"auto"}
            mr={"auto"}
            gap={3}
            flexDirection={"column"}
        >
            {novella && ( // Check if novella is loaded before rendering
                <Flex
                    h={260}
                    w={"100%"}
                    border={"var(--bordercolor) solid 1px"}
                    rounded={10}
                    position={"relative"}
                    overflow={"hidden"}
                >
                    <Image
                        src={novella.img} // Use novella.img for image source
                        w={"100%"}
                        objectFit={"cover"}
                    />
                    <Box
                        position={"absolute"}
                        top={0}
                        bottom={0}
                        left={0}
                        right={0}
                        bgGradient="linear(to-b,  #1b202d , transparent )"
                    />
                    <Box position={"absolute"} top={4} maxW={"800px"}>
                        <Flex flexDirection={"column"} px={5}>
                            <Text fontSize={"3xl"}>{novella.title}</Text>
                            <Text color={"gray.400"}>{novella.description}</Text>
                        </Flex>
                    </Box>
                    <Box position={"absolute"} bottom={4} left={5}>
                        <NavLink to={`/novella/${id}/read`}>
                            <Button mt={5} mr={3} colorScheme="cyan" size={"sm"}>
                                Read
                            </Button>
                        </NavLink>
                        <NavLink to={`/novella/${id}/forum`}>
                            <Button mt={5} mr={3} size={"sm"}>
                                Forum
                            </Button>
                        </NavLink>
                    </Box>
                </Flex>
            )}

            <Flex w={"100%"} m={"10px auto"} gap={3} flexDirection={"column"}>
                <Outlet />
            </Flex>
        </Flex>
    );
};

export default Novella;
