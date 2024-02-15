import { Image, Button, Flex, Text, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { TiStar } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";

const Navbar = () => {
    return (
        <Flex
            align="center"
            justify="space-between"
            display="flex"
            h="60px"
            px="15px"
        >
            <Flex gap={5}>
                <Text fontSize={"xl"}>Lumina Read</Text>

                <Flex gap="5px" alignItems={"end"}>
                    <NavLink to="/marketplace">
                        <Button
                            size={"sm"}
                            color={"gray.400"}
                            variant="ghost"
                            gap={1}
                        >
                            Market Place
                            <BsStars color="cyan" />
                        </Button>
                    </NavLink>
                    <NavLink to="/package">
                        <Button size={"sm"} color={"gray.400"} variant="ghost">
                            Package
                        </Button>
                    </NavLink>
                    <NavLink to="/">
                        <Button size={"sm"} color={"gray.400"} variant="ghost">
                            Book
                        </Button>
                    </NavLink>
                    <NavLink to="/">
                        <Button size={"sm"} color={"gray.400"} variant="ghost">
                            About
                        </Button>
                    </NavLink>
                    <NavLink to="/">
                        <Button size={"sm"} color={"gray.400"} variant="ghost">
                            contact
                        </Button>
                    </NavLink>
                </Flex>
            </Flex>
            <Flex alignItems={"center"} gap={3}>
                <Button size={"sm"} color={"gray.400"}>
                    Login
                </Button>
                <Button size={"sm"} color={"gray.400"}>
                    Sign up
                </Button>
                <Button size={"sm"} color={"gray.400"}>
                    <IoNotifications />
                </Button>
                <Button size={"sm"} color={"gray.400"}>
                    <IoMdCart />
                </Button>

                <Button size={"sm"} color={"gray.400"}>
                    Profile
                </Button>
                <Flex
                    w={"40px"}
                    h={"40px"}
                    rounded={10}
                    border={"solid 1px"}
                    borderColor={"red.400"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    position={"relative"}
                >
                    <Image
                        src="https://i.gyazo.com/83ece1f06f397ab5928a6b9944a27146.png"
                        w={"100%"}
                        h={"100%"}
                        rounded={10}
                    />
                    <Flex
                        position={"absolute"}
                        bottom={-2}
                        bg={
                            "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(208,131,23,1) 71%, rgba(253,29,29,1) 100%)"
                        }
                        color={"white"}
                        p={"0 3px"}
                        border={"var(--bordercolor) solid 1px"}
                        fontSize={"xs"}
                        alignItems={"center"}
                        rounded={"15px"}
                        overflow={"hidden"}
                    >
                        <Text>150</Text>
                        <TiStar />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Navbar;
