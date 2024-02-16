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
    ButtonGroup,
    CardFooter,
    Stack,
    CardBody,
    Heading,
    Card,
} from "@chakra-ui/react";
import { FaSearch, FaStar } from "react-icons/fa";

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
                            src="https://i.gyazo.com/83ece1f06f397ab5928a6b9944a27146.png"
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
                    <Box position={"absolute"} bottom={4} right={2}>
                        <Button mt={5} mr={3} colorScheme="cyan" size={"sm"}>
                            Buy This Pack
                        </Button>
                    </Box>
                </Flex>
                <Flex flexDirection={"column"} gap={3} ml={2}>
                    <Text fontSize={"lg"}>Search Section For books</Text>
                    <InputGroup size="md" w={300}>
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
                            bg={"var(--lvl1-darkcolor)"}
                            border={"var(--bordercolor) solid 1px "}
                            p={0}
                        >
                            <CardBody>
                                <Image
                                    src="https://i.gyazo.com/2de8a8974f6ba0aa6d9dedd317e11873.png"
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
                                    <Flex alignItems={"center"} gap={3} mt={3}>
                                        <Image
                                            src="https://i.gyazo.com/83ece1f06f397ab5928a6b9944a27146.png"
                                            h={"40px"}
                                            w={"40px"}
                                            rounded={"50%"}
                                        />
                                        <Box>
                                            <Text as="b">
                                                Saif Eddine Jelassi
                                            </Text>
                                            <Text
                                                display={"flex"}
                                                alignItems={"center"}
                                                gap={2}
                                            >
                                                5 <FaStar />
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Stack>
                            </CardBody>
                            <CardFooter
                                bg={"var(--lvl2-darkcolor)"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                m={"-10px 10px 10px 10px"}
                                rounded={10}
                            >
                                <Text
                                    color="cyan.200"
                                    fontSize="2xl"
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                >
                                    450 <Text fontSize={"xs"}>DT</Text>
                                </Text>
                                <ButtonGroup spacing="2">
                                    <Button variant="ghost" size={"sm"}>
                                        Add to cart
                                    </Button>
                                    <Button size={"sm"} colorScheme="cyan">
                                        Buy
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    ))}
                </Wrap>{" "}
            </Flex>
        </Box>
    );
};

export default Package;
