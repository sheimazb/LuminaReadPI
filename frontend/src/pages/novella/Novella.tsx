import React from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { NavLink, Outlet, useParams } from "react-router-dom";

const Novella = () => {
    const { id } = useParams();

    return (
        <Flex
            w={"1200px"}
            pt={20}
            ml={"auto"}
            mr={"auto"}
            gap={3}
            flexDirection={"column"}
        >
            <Flex
                h={260}
                w={"100%"}
                border={"var(--bordercolor) solid 1px"}
                rounded={10}
                position={"relative"}
                overflow={"hidden"}
            >
                <Image
                    src="https://i.gyazo.com/e1a2c7bf83cf944a115f0355cbe649ec.png"
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
                        <Text fontSize={"3xl"}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </Text>
                        <Text color={"gray.400"}>
                            Id corrupti animi eius quis eligendi atque, saepe
                            et. Temporibus rerum molestiae blanditiis laboriosam
                            modi velit voluptate assumenda et. Sapiente,
                            blanditiis facilis?
                        </Text>
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

            <Flex w={"100%"} m={"10px auto"} gap={3} flexDirection={"column"}>
                <Outlet />
            </Flex>
        </Flex>
    );
};

export default Novella;
