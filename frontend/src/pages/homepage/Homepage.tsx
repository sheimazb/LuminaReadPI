import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Homepage = () => {
    const [code, setCode] = useState(null); // State to store the generated code
    const navigate = useNavigate();

    const handleAddText = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/AddText",
                {
                    text_content: "Your default text content here",
                }
            );
            console.log(response.data);
            setCode(response.data.code);
            navigate(`/TextReader/${response.data.code}`);
        } catch (error) {
            console.error("Error adding text:", error);
        }
    };

    return (
        <Box>
            <Flex
                h={"calc(100vh - 60px)"}
                alignContent={"center"}
                justifyContent={"center"}
            >
                <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                >
                    <Text
                        fontSize={"6xl"}
                        w={"max-content"}
                        textAlign={"center"}
                    >
                        Let your Data do more for you!
                    </Text>
                    <Text
                        fontSize={"xl"}
                        color={"gray.400"}
                        textAlign={"center"}
                        mt={7}
                    >
                        Our products allow individuals to monetize their
                        footprint on the internet.
                    </Text>
                    <Box textAlign={"center"}>
                        <Button
                            onClick={handleAddText}
                            colorScheme="cyan"
                            variant="outline"
                            mt={10}
                            rounded={20}
                            mr={2}
                        >
                            Text Reader
                        </Button>
                        <Button
                            colorScheme="gray"
                            rightIcon={<FaRegArrowAltCircleRight />}
                            mt={10}
                            variant="outline"
                            rounded={20}
                        >
                            Get in touch
                        </Button>
                    </Box>
                </Flex>
            </Flex>
            <Box minH={900}>faz</Box>
        </Box>
    );
};

export default Homepage;
