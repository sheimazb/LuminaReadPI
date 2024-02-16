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
import { FaFilter, FaList, FaSearch, FaStar } from "react-icons/fa";

const Marketplace = () => {
    const range = (n: number) => [...Array(n).keys()];

    return (
        <Box>
            <Flex
                h={250}
                bg={"var(--lvl1-darkcolor)"}
                justifyContent={"center"}
                alignItems={"center"}
                overflow={"hidden"}
                position={"relative"}
                backdropFilter={"sepia(90%)"}
            >
                <Image
                    src="https://i.gyazo.com/706a645ba061f1a126897be47f21667c.png"
                    w={"100%"}
                />
                <Box
                    position={"absolute"}
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    bgGradient="linear(to-t,  #1b202d , transparent)"
                />
                <Box position={"absolute"} textAlign={"center"}>
                    <Text fontSize={"3xl"} zIndex={1}>
                        Packages Market Place
                    </Text>
                    <Text fontSize={"md"} zIndex={1} color={"gray.300"}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                    </Text>
                    <Button mt={5} mr={3} colorScheme="cyan" size={"sm"}>
                        Check Pack
                    </Button>
                    <Button mt={5} size={"sm"}>
                        Login
                    </Button>
                </Box>
            </Flex>
            <Flex p={4} flexDirection={"column"} gap={3}>
                <Flex alignItems={"center"} gap={3}>
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
                    <Button size={"sm"} gap={2}>
                        Category
                    </Button>
                    <Button size={"sm"}>
                        <FaFilter />
                    </Button>
                    <Button size={"sm"}>
                        <FaList />
                    </Button>
                </Flex>
                <Flex gap={3}>
                    <Flex
                        w={"270px"}
                        h={900}
                        border={"var(--bordercolor) solid 1px"}
                        rounded={10}
                    >
                        Filter
                    </Flex>
                    <Wrap w={"calc(100vw - 300px)"} p={2}>
                        {range(10).map((index) => (
                            <Card
                                maxW="300px"
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
                                        <Text
                                            color={"gray.300"}
                                            fontSize={"sm"}
                                        >
                                            Lorem, ipsum dolor sit amet
                                            consectetur.
                                        </Text>
                                        <Flex
                                            alignItems={"center"}
                                            gap={3}
                                            mt={3}
                                        >
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
                                            Buy now
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        ))}
                    </Wrap>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Marketplace;