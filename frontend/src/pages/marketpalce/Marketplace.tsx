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
    ButtonGroup,
    CardFooter,
    Stack,
    CardBody,
    Heading,
    Card,
    useToast,
    Select,
    Link,
} from "@chakra-ui/react";
import axios from "axios";
import { FaFilter, FaList, FaSearch, FaStar } from "react-icons/fa";
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

const Marketplace = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const { search, category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = localStorage.getItem("id");

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

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setSearchResults(response.data.packs);
            setSearchParams({ search: searchValue, category: categoryValue });
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
    const handleSearchFormSubmit = (e: any) => {
        e.preventDefault();
        handleSearch();
    };

    const [packs, setPacks] = useState([]);
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const handleClickShow = (pack: any) => {
        navigate(`/package/${pack.id}`);
    };

    useEffect(() => {
        (async () => await loadPacks())();
    }, []);

    async function loadPacks() {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/AllPack");
            setPacks(result.data.packs);
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
                <form onSubmit={handleSearchFormSubmit}>
                    <Flex alignItems={"center"} gap={3}>
                        <InputGroup size="md">
                            <Input
                                borderColor={"gray.700"}
                                placeholder="Search section"
                                name="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <InputRightElement>
                                <Button
                                    onClick={handleSearch}
                                    size="xs"
                                    mr={1}
                                    color={"white"}
                                    type="button"
                                >
                                    <FaSearch />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Select
                            size="sm"
                            borderColor={"gray.700"}
                            name="category"
                            placeholder="Category"
                            value={categoryValue}
                            onChange={(e) => setCategoryValue(e.target.value)}
                        >
                            <option value="">All</option>
                            {[
                                ...new Set(packs.map((pack) => pack.category)),
                            ].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                        <Button
                            size={"sm"}
                            type="submit" // Ajoutez type="button" pour éviter le comportement par défaut du formulaire
                        >
                            <FaFilter />
                        </Button>
                        <Button size={"sm"}>
                            <FaList />
                        </Button>
                    </Flex>
                </form>

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
                        {searchValue.length === 0 && categoryValue.length === 0
                            ? packs.map((pack: any, index: any) => (
                                  <Card
                                      minW="300px"
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
                                                      src={pack.usser.img}
                                                      h={"40px"}
                                                      w={"40px"}
                                                      rounded={"50%"}
                                                  />
                                                  <Box>
                                                      <Text>
                                                          {pack.usser.name}
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
                                              {pack.packStatus == 0 && (
                                                  <Button
                                                      variant="ghost"
                                                      size={"sm"}
                                                      onClick={() =>
                                                          addToCart(pack)
                                                      }
                                                  >
                                                      Add
                                                  </Button>
                                              )}

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
                              ))
                            : searchResults.map((pack: any, index: number) => (


                                <Card minW="300px" 
                                key={index}
                                
                                h={"300px"} bg={"transparent"} p={0}>
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
                                            <Text color={"gray.400"}>
                                                12/05/2012
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Text as={"b"} fontSize={"xl"}>
                                    {pack.title}

                                    </Text>
                                    <Text color={"gray"}>
                                    {pack.description}

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
                                        <Flex alignItems={"center"} gap={1}>
                                            <Link color={"cyan"}  onClick={() =>
                                                      handleClickShow(pack)
                                                  }>Show </Link>
                                            <BsArrowRight color="cyan" />
                                        </Flex>
                                        <Flex alignItems={"center"}>
                                            <Text fontSize={'2xl'}>{pack.price}{" "}</Text>
                                            <Text ml={1} fontSize={"xs"}>
                                                €
                                            </Text>
    
                                            <Button bg={"transparent"}
                                                  size={"sm"}
                                              onClick={() =>
                                                addToCart(pack)
                                            }
                                            >
                                                <CiShoppingCart
                                                    color="cyan"
                                                    fontSize={25}
                                                />
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Card>




                                 
                              ))}
                       
                    </Wrap>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Marketplace;
