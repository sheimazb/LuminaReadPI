import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Homepage = () => {
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
                            colorScheme="gray"
                            w={"max-content"}
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
