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
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilter, FaList, FaSearch, FaStar } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AddPackage from "../addpackage/AddPackage";

const Marketplace = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [packs, setPacks] = useState([]);
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const handleClickShow = (pack: any): void => {
        navigate(`/package/${pack.id}`);
    };
    useEffect(() => {
        (async () => await loadPacks())();
    }, []);

    async function loadPacks() {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/AllPack");
            setPacks(result.data.pack);
        } catch (error) {
            console.error("Error loading packs:", error);
        }
    }

    const addToCart = (pack: any) => {
        const packageExists = cart.some((item: any) => item.id === pack.id);

        if (packageExists) {
            console.log("Package already exists in the cart.");
            toast({
                title: "Package already exists in the cart",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });

            return;
        }

        const updatedCart = [...cart, pack];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

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

                <Box position={"absolute"} textAlign={"center"} mb={5}>
                    <Text fontSize={"3xl"} zIndex={1}>
                        Packages Market Place
                    </Text>
                    <Text fontSize={"md"} zIndex={1} color={"gray.300"} mb={5}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                    </Text>

                    <AddPackage />
                    <NavLink to="/Auth/signup">
                        <Button size={"sm"} ml={3}>
                            Sign up
                        </Button>
                    </NavLink>
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
                        {packs &&
                            packs.map((pack: any, index: number) => (
                                <Card
                                    maxW="300px"
                                    key={index}
                                    bg={"var(--lvl1-darkcolor)"}
                                    border={"var(--bordercolor) solid 1px "}
                                    p={0}
                                >
                                    <CardBody>
                                        <Image
                                            src={pack.img}
                                            alt="Green double couch with wooden legs"
                                            borderRadius="lg"
                                            w={"100%"}
                                            h={160}
                                        />
                                        <Stack mt="3" spacing="1">
                                            <Heading size="md">
                                                {pack.title}
                                            </Heading>
                                            <Text
                                                color={"gray.300"}
                                                fontSize={"sm"}
                                            >
                                                {pack.description}
                                            </Text>
                                            <Flex
                                                alignItems={"center"}
                                                gap={3}
                                                mt={3}
                                            >
                                                <Image
                                                    src="https://i.gyazo.com/df168e15d60588f5f47e2faa9e9cae6c.png"
                                                    h={"40px"}
                                                    w={"40px"}
                                                    rounded={"50%"}
                                                />
                                                <Box>
                                                    <Text>
                                                        Saif Eddine Jelassi
                                                    </Text>
                                                    <Text
                                                        display={"flex"}
                                                        alignItems={"center"}
                                                        fontSize={"sm"}
                                                        color={"yellow.400"}
                                                        gap={1}
                                                    >
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
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
                                            {pack.price}{" "}
                                            <Text fontSize={"xs"}>DT</Text>
                                        </Text>
                                        <ButtonGroup spacing="2">
                                            <Button
                                                variant="ghost"
                                                size={"sm"}
                                                onClick={() => addToCart(pack)}
                                            >
                                                Add
                                            </Button>
                                            <Button
                                                size={"sm"}
                                                colorScheme="cyan"
                                            >
                                                Buy now
                                            </Button>
                                            <Button
                                                size={"s"}
                                                colorScheme="cyan"
                                                onClick={() =>
                                                    handleClickShow(pack)
                                                }
                                            >
                                                Show
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
