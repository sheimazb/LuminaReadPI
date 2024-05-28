import React, { useState, useEffect } from "react";
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
    Card,
    useToast,
    Link,
    TagLabel,
    TagCloseButton,
    Tag,
    useColorMode,
    Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { FaFilter, FaSearch, FaStar } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import {
    NavLink,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import AddPackage from "../addpackage/AddPackage";
import { BsArrowRight } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";

const pastelColors = [
    "teal.200",
    "purple.200",
    "pink.200",
    "red.200",
    "cyan.200",
    "orange.200",
    "blue.200",

    "yellow.200",
    "green.200",
];

const Marketplace = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const { search, category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const idString = localStorage.getItem("id");
    const id = idString ? parseInt(idString, 10) : 0;
    const isLoggedIn = localStorage.getItem("token") !== null;

    useEffect(() => {
        setSearchValue(search || "");
        setCategoryValue(category || "");
    }, [search, category]);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem("token");
            let url = "http://127.0.0.1:8000/api/AllPack?";
            if (searchValue) {
                url += `search=${searchValue}`;
            }

            if (categoryValue) {
                if (searchValue) {
                    url += `&category=${categoryValue}`;
                } else {
                    url += `category=${categoryValue}`;
                }
            }

            // Fetch packs from Laravel backend
            const packsResponse = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const packs = packsResponse.data.packs;

            // Fetch recommended packs from Flask server
            const flaskUrl = "http://127.0.0.1:5000";
            const flaskResponse = await axios.post(flaskUrl, {
                title: searchValue,
            });
            const recommendedPacks = flaskResponse.data.recommendations;

            // Combine packs and recommended packs
            const combinedPacks = [...packs, ...recommendedPacks];

            // Update state with combined packs
            setSearchResults(combinedPacks);
        } catch (error) {
            console.error("Error fetching search results:", error);
            toast({
                title: "Error",
                description: "An error occurred while fetching search results.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleSearchFormSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    const [packs, setPacks] = useState([]);
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get("http://127.0.0.1:8000/api/AllPack");
                setPacks(result.data.packs);
            } catch (error) {
                console.error("Error loading packs:", error);
                toast({
                    title: "Error",
                    description: "An error occurred while loading packs.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        })();
    }, []);

    const addToCart = (pack) => {
        const packageExists = cart.some((item) => item.id === pack.id);

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

    const { colorMode } = useColorMode();
    const handleClickShow = (pack) => {
        navigate(`/package/${pack.id}`);
    };
    return (
        <Box bg={colorMode === "light" ? "gray.200" : "black"}>
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
                    bgGradient="linear(to-t,  #140e0e53 , transparent)"
                />

                <Box position={"absolute"} textAlign={"center"} mb={5}>
                    <Text fontSize={"3xl"} zIndex={1} color={colorMode === "light" ? "white" : "white"}>
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
                <form onSubmit={handleSearchFormSubmit}>
                    <Flex alignItems={"center"} gap={3}>
                        <InputGroup size="md" ml={500} mr={500}>
                            <Input
                                borderColor={colorMode === "light" ? "teal.300" : "teal.900"}
                                placeholder="Search pack"
                                name="search"
                                borderRadius={"20px"}
                                value={searchValue}
                                bg={colorMode === "light" ? "gray.100" : "black"}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <InputRightElement>
                                <Button
                                    onClick={handleSearch}
                                    size="xs"
                                    mr={1}
                                    color={colorMode === "light" ? "white" : "black"}
                                    type="button"
                                    borderRadius={"35"}
                                    bg={"teal.300"}
                                >
                                    <FaSearch color="gray" />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                </form>

                <Flex gap={3}>
                    <Flex
                        minW={"350"}
                        h={900}
                        rounded={10}
                        direction={"column"}
                        p={4}
                    >
                        <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Text fontSize={"xl"}>Categories</Text>
                            <Button
                                onClick={handleSearch}
                                size="xs"
                                mr={1}
                                color={"gary"}
                                type="button"
                                borderRadius={"35"}
                                bg={"gray"}
                            >
                                <FaFilter color="white" />
                            </Button>
                        </Flex>
                        <Divider mb={5} mt={2} bg={colorMode === "light" ? "black" : "teal.500"} />
                        <Flex gap={2} p={2}>
                            <Wrap>
                                {packs.map((pack, index) => (
                                    <Tag
                                        key={index}
                                        size="md"
                                        h={"max-content"}
                                        variant="solid"
                                        color={"gray.900"}
                                        backgroundColor={pastelColors[index % pastelColors.length]}
                                        borderRadius="full"
                                        cursor="pointer"
                                        onClick={() => setCategoryValue(pack.category)}
                                    >
                                        <TagCloseButton />
                                    </Tag>
                                ))}
                            </Wrap>
                        </Flex>
                    </Flex>
                    <Flex direction={'column'} p={4} gap={3}>
                        <Text fontSize={'xl'}>Packages Available</Text>
                        <Tag
                            w={'max-content'}
                            color={colorMode === "light" ? "orange" : "pink"}
                            bg={colorMode === "light" ? "gray.300" : "gray.700"}
                        >
                            Once logged in, you can purchase a package
                        </Tag>
                        <Wrap w={"calc(100vw - 300px)"} p={2}>
                            {searchValue.length === 0 && categoryValue.length === 0
                                ? packs.map((pack, index) => (
                                      <Card
                                          w="300px"
                                          key={index}
                                          m={3}
                                          h={"380px"}
                                          borderRadius={"10px"}
                                          border={"1px solid "}
                                          borderColor={colorMode === "light" ? "teal.300" : "teal.800"}
                                          bg={"transparent"}
                                          p={3}
                                      >
                                          <Flex direction={"column"} gap={1}>
                                              <Image
                                                  borderRadius={"30px"}
                                                  w={"300px"}
                                                  h={"200px"}
                                                  objectFit="cover"
                                                  src={pack.img}
                                                  alt="Dan Abramov"
                                              />
                                              <Flex alignItems={"center"} gap={6}>
                                                  <Flex alignItems={"center"} gap={1}>
                                                      <CiUser color={"cyan"} />{" "}
                                                      <Text color={"gray.400"}>{pack.usser.name}</Text>
                                                  </Flex>
                                                  <Text color={"gray"}>|</Text>
                                                  <Flex alignItems={"center"} gap={1}>
                                                      <CiCalendarDate color={"cyan"} />{" "}
                                                      <Text color={"gray.400"}>12/05/2012</Text>
                                                  </Flex>
                                              </Flex>
                                              <Text as={"b"} fontSize={"xl"}>
                                                  {pack.title}
                                              </Text>
                                              <Text color={"gray"}>
                                                  {pack.description
                                                      .split(" ")
                                                      .slice(0, 10)
                                                      .join(" ")}
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
                                              <Flex
                                                  alignItems={"center"}
                                                  gap={1}
                                                  justifyContent={"space-between"}
                                              >
                                                  {isLoggedIn && (
                                                      <Flex alignItems={"center"} gap={1}>
                                                          <Link
                                                              color={"cyan"}
                                                              onClick={() => handleClickShow(pack)}
                                                          >
                                                              Show{" "}
                                                          </Link>
                                                          <BsArrowRight color="cyan" />
                                                      </Flex>
                                                  )}
                                                  <Flex alignItems={"center"}>
                                                      <Text fontSize={"2xl"}>{pack.price} </Text>
                                                      <Text ml={1} fontSize={"xs"}>
                                                          €
                                                      </Text>
                                                      {pack.user_id !== id && pack.packStatus === 0 && (
                                                          <Button
                                                              bg={"transparent"}
                                                              _hover={{
                                                                  bg: "transparent",
                                                                  borderColor: "transparent",
                                                              }}
                                                              onClick={() => addToCart(pack)}
                                                          >
                                                              <CiShoppingCart color="cyan" fontSize={25} />
                                                          </Button>
                                                      )}
                                                  </Flex>
                                              </Flex>
                                          </Flex>
                                      </Card>
                                  ))
                                : searchResults.map((pack, index) => (
                                      <Card
                                          w="300px"
                                          key={index}
                                          m={3}
                                          h={"380px"}
                                          borderRadius={"10px"}
                                          border={"1px solid "}
                                          borderColor={"gray.700"}
                                          bg={"transparent"}
                                          p={3}
                                      >
                                          <Flex direction={"column"} gap={2}>
                                              <Image
                                                  borderRadius={"30px"}
                                                  w={"300px"}
                                                  h={"200px"}
                                                  objectFit="cover"
                                                  src={pack.img}
                                                  alt="Dan Abramov"
                                              />
                                              <Flex alignItems={"center"} gap={6}>
                                                  <Flex alignItems={"center"} gap={1}>
                                                      <CiUser color={"cyan"} />{" "}
                                                      <Text color={"gray.400"}>{pack.usser.name}</Text>
                                                  </Flex>
                                                  <Text color={"gray"}>|</Text>
                                                  <Flex alignItems={"center"} gap={1}>
                                                      <CiCalendarDate color={"cyan"} />{" "}
                                                      <Text color={"gray.400"}>12/05/2012</Text>
                                                  </Flex>
                                              </Flex>
                                              <Text as={"b"} fontSize={"xl"}>
                                                  {pack.title}
                                              </Text>
                                              <Text color={"gray"}>{pack.description}</Text>
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
                                              <Flex
                                                  alignItems={"center"}
                                                  gap={1}
                                                  justifyContent={"space-between"}
                                              >
                                                  <Flex alignItems={"center"} gap={1}>
                                                      <Link
                                                          color={"cyan"}
                                                          onClick={() => handleClickShow(pack)}
                                                      >
                                                          Show{" "}
                                                      </Link>
                                                      <BsArrowRight color="cyan" />
                                                  </Flex>
                                                  <Flex alignItems={"center"}>
                                                      <Text fontSize={"2xl"}>{pack.price} </Text>
                                                      <Text ml={1} fontSize={"xs"}>
                                                          €
                                                      </Text>
                                                      {pack.user_id !== id &&
                                                          pack.packStatus === 0 && (
                                                              <Button
                                                                  bg={"transparent"}
                                                                  _hover={{
                                                                      bg: "transparent",
                                                                      borderColor: "transparent",
                                                                  }}
                                                                  onClick={() => addToCart(pack)}
                                                              >
                                                                  <CiShoppingCart color="cyan" fontSize={25} />
                                                              </Button>
                                                          )}
                                                  </Flex>
                                              </Flex>
                                          </Flex>
                                      </Card>
                                  ))}
                        </Wrap>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Marketplace;
