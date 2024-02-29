import { useState } from "react";
import {
    Image,
    Button,
    Flex,
    Text,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Badge,
    Tooltip,
    Drawer,
    DrawerContent,
    DrawerCloseButton,
    DrawerOverlay,
    DrawerHeader,
    DrawerBody,
    IconButton,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { TiStar } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { FaBookReader, FaSun, FaMoon } from "react-icons/fa";
import CartContent from "./CartContent";
interface NavbarProps {
    toggleColorMode: () => void;
    colorMode: any;
}
const Navbar = ({ toggleColorMode, colorMode }: NavbarProps) => {
    const [cartItems, setCartItems] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const isLoggedIn = localStorage.getItem("token") == null;

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "Open package X today to unlock exclusive content!",
            date: "2024-02-17",
            seen: false,
        },
        {
            id: 2,
            message: "New book 'The Lost World' is now available for purchase.",
            date: "2024-02-16",
            seen: true,
        },
        {
            id: 3,
            message: "Don't forget to check out our latest blog post!",
            date: "2024-02-15",
            seen: false,
        },
    ]);

    const markNotificationAsSeen = (id: any) => {
        const updatedNotifications = notifications.map((notification) => {
            if (notification.id === id) {
                return { ...notification, seen: true };
            }
            return notification;
        });
        setNotifications(updatedNotifications);
    };

    return (
        <Flex
            align="center"
            justify="space-between"
            display="flex"
            h="60px"
            px="15px"
        >
            <Flex gap={5}>
                <NavLink to="/">
                    <Text
                        mb={1}
                        fontSize={"xl"}
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                        color={"gray.50"}
                    >
                        <Box color="cyan.600">
                            <FaBookReader />
                        </Box>
                        Lumina Read
                    </Text>
                </NavLink>
                <Flex gap="5px" alignItems={"end"}>
                    <NavLink to="/TextReader">
                        <Button
                            size={"sm"}
                            color={"gray.400"}
                            variant="ghost"
                            gap={1}
                        >
                            Text Reader
                            <BsStars color="cyan" />
                        </Button>
                    </NavLink>
                    <NavLink to="/marketplace">
                        <Button
                            size={"sm"}
                            color={"gray.400"}
                            variant="ghost"
                            gap={1}
                        >
                            Market Place
                        </Button>
                    </NavLink>
                    <NavLink to="/package">
                        <Button size={"sm"} color={"gray.400"} variant="ghost">
                            Package
                        </Button>
                    </NavLink>
                    <NavLink to="/novella/1">
                        <Button size={"sm"} color={"gray.400"} variant="ghost">
                            Novella
                        </Button>
                    </NavLink>
                    <NavLink to="/addNovella/2">
                        <Button size={"sm"} color={"gray.400"} variant="ghost">
                            AddNovella
                        </Button>
                    </NavLink>
                    {/** NavLink to={`/addPackage/${token}`}*/}
                    <NavLink to="/addPackage">
                        <Button size={"sm"} color={"gray.400"} variant="ghost">
                            AddPackage
                        </Button>
                    </NavLink>
                </Flex>
            </Flex>

            <Flex alignItems={"center"} gap={3}>
                <Menu>
                    <MenuButton
                        as={Button}
                        size={"sm"}
                        position="relative"
                        onClick={toggleDrawer}
                    >
                        <IoMdCart />
                        {cartItems.length > 0 && (
                            <Badge
                                position="absolute"
                                top="-5px"
                                right="-5px"
                                colorScheme="red"
                                borderRadius="full"
                                px="2"
                            >
                                {cartItems.length}
                            </Badge>
                        )}
                    </MenuButton>
                </Menu>
                <IconButton
                    size={"sm"}
                    icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                    onClick={toggleColorMode}
                    aria-label="Toggle Dark Mode"
                />
                {isLoggedIn ?  (
                    <Flex gap={3} alignItems={"center"}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                size={"sm"}
                                position="relative"
                            >
                                <IoNotifications />
                                {notifications.some(
                                    (notification) => !notification.seen
                                ) && (
                                    <Badge
                                        position="absolute"
                                        top="-5px"
                                        right="-5px"
                                        colorScheme="red"
                                        borderRadius="full"
                                        px="2"
                                    >
                                        {
                                            notifications.filter(
                                                (notification) =>
                                                    !notification.seen
                                            ).length
                                        }
                                    </Badge>
                                )}
                            </MenuButton>
                            <MenuList
                                style={{
                                    minWidth: "unset",
                                    maxWidth: "350px",
                                }}
                                zIndex={100}
                            >
                                {notifications.map((notification) => (
                                    <MenuItem
                                        key={notification.id}
                                        _hover={{
                                            bg: "gray.800",
                                        }}
                                        _focus={{
                                            bg: "gray.800",
                                        }}
                                        onClick={() =>
                                            markNotificationAsSeen(
                                                notification.id
                                            )
                                        }
                                    >
                                        <Flex
                                            align="center"
                                            justify="space-between"
                                        >
                                            <Flex align="center">
                                                {!notification.seen && (
                                                    <Tooltip
                                                        label="Unseen"
                                                        hasArrow
                                                        placement="top"
                                                    >
                                                        <Box
                                                            w="4px"
                                                            h="4px"
                                                            bg="red.400"
                                                            rounded="full"
                                                            mr={2}
                                                        />
                                                    </Tooltip>
                                                )}

                                                <Text>
                                                    {notification.message}
                                                    <Text
                                                        fontSize="xs"
                                                        color="gray.500"
                                                    >
                                                        {notification.date}
                                                    </Text>
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>

                        <NavLink to="/profile">
                            <Button size={"sm"}>Profile</Button>
                        </NavLink>
                        <Flex
                            w={"40px"}
                            h={"40px"}
                            rounded={10}
                            border={"solid 1px"}
                            borderColor={"cyan.400"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            position={"relative"}
                        >
                            <Image
                                src="https://i.gyazo.com/df168e15d60588f5f47e2faa9e9cae6c.png"
                                w={"100%"}
                                h={"100%"}
                                rounded={10}
                            />
                            <Flex
                                position={"absolute"}
                                bottom={-2}
                                bg={
                                    "linear-gradient(90deg, rgba(107,29,253,1) 0%, rgba(23,151,208,1) 71%, rgba(29,71,253,1) 100%)"
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
                ):(
                    <Flex gap={3}>
                        <NavLink to="/Auth/login">
                            <Button size={"sm"}>Login</Button>
                        </NavLink>
                        <NavLink to="/Auth/signup">
                            <Button size={"sm"}>Sign up</Button>
                        </NavLink>
                    </Flex>
                ) }
            </Flex>

            <Drawer
                placement="right"
                onClose={toggleDrawer}
                isOpen={isDrawerOpen}
            >
                <DrawerOverlay />
                <DrawerContent
                    mt={5}
                    mr={5}
                    roundedTopLeft={5}
                    roundedTopRight={5}
                >
                    <DrawerCloseButton />
                    <DrawerHeader>Cart</DrawerHeader>
                    <DrawerBody>
                        <CartContent />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    );
};

export default Navbar;
