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
    Textarea,
} from "@chakra-ui/react";
import { FaCommentAlt } from "react-icons/fa";
const Novella = () => {
    return (
        <Flex w={"1200px"} m={"30px auto"} gap={3} flexDirection={"column"}>
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
                    <Button mt={5} mr={3} colorScheme="cyan" size={"sm"}>
                        Read
                    </Button>{" "}
                </Box>
            </Flex>
            <Flex justifyContent={"space-between"} gap={3}>
                <Flex
                    w={"100%"}
                    p={3}
                    rounded={10}
                    flexDirection={"column"}
                    gap={3}
                >
                    <Flex alignItems={"center"} gap={3}>
                        <FaCommentAlt /> <Text>5 Comments</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={1}>
                        <Text fontSize={"sm"}>
                            Comment as Saif Eddine Jelassi
                        </Text>
                        <Textarea placeholder="Here is a sample placeholder" />
                    </Flex>
                    <Flex alignItems={"start"} gap={3} mt={2}>
                        <Image
                            src="https://i.gyazo.com/83ece1f06f397ab5928a6b9944a27146.png"
                            h={"30px"}
                            w={"30px"}
                            rounded={"50%"}
                        />
                        <Flex flexDirection={"column"}>
                            <Flex gap={1} alignItems={"center"}>
                                <Text as="b">Saif Eddine Jelassi</Text>
                                <Text fontSize={"sm"}>15 june ,2013</Text>
                            </Flex>
                            <Text color={"gray.400"}>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Dolore laborum suscipit
                                temporibus eum nobis atque a, earum esse
                                accusamus minus vero! Quod dolorum eum ducimus
                                voluptatum voluptates harum, provident ullam!
                            </Text>
                            <Flex gap={2}>
                                <Button mt={2} size={"xs"}>
                                    Edit
                                </Button>
                                <Button mt={2} size={"xs"}>
                                    Delete
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    w={"350px"}
                    border={"var(--bordercolor) solid 1px"}
                    p={3}
                    rounded={10}
                >
                    News
                </Flex>
            </Flex>
        </Flex>
    );
};
export default Novella;
