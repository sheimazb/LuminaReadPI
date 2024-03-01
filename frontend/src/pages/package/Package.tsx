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
import { FaSearch, FaStar } from "react-icons/fa";
import AddNovella from "../addnovella/AddNovella";


const Package = () => {
    const range = (n: number) => [...Array(n).keys()];

    return (
        <Box w={"90%"} m={"30px auto"}>
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
                    <Box position={"absolute"}   mt={5} bottom={4} right={2}>
                        <AddNovella />
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
                    {range(10).map((index) => (
                        <Card
                            maxW="270px"
                            key={index}
                            bg={"transparent"}
                            border={"var(--bordercolor) solid 1px "}
                            p={0}
                        >
                            <CardBody>
                                <Image
                                    src="https://i.gyazo.com/e1a2c7bf83cf944a115f0355cbe649ec.png"
                                    alt="Green double couch with wooden legs"
                                    borderRadius="lg"
                                    w={"100%"}
                                    h={160}
                                />
                                <Stack mt="3" spacing="1">
                                    <Heading size="md">
                                        Best Stories For kids
                                    </Heading>
                                    <Text color={"gray.300"} fontSize={"sm"}>
                                        Lorem, ipsum dolor sit amet consectetur.
                                    </Text>
                                    <Button mt={2} size={"sm"}>
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
