import { useState, useEffect } from "react";
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
    useColorMode,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { TiStar } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { FaBookReader } from "react-icons/fa";
import CartContent from "./CartContent";
import { useUserStore } from "../stores/user";
import axios from "axios";
import ThemeSwitcher from "./ThemeSwitcher";

interface Notification {
    id: number;
    content: string;
    created_at: string;
    seen: boolean;
}

const Navbar = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { logout } = useUserStore();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const isLoggedIn = localStorage.getItem("token") !== null;
    const id = localStorage.getItem("id");
    const { colorMode } = useColorMode();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const [user, setUser] = useState({
        img: "",
    });
    useEffect(() => {
        (async () => await fetchUser())();
    }, []);
    async function fetchUser() {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUser(response.data.user);
        console.log(response.data.user);
    }

    const fetchNotifications = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/notifications/" + id
            );
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markNotificationAsSeen = async (id: number) => {
        try {
            await fetch(
                `http://127.0.0.1:8000/api/notifications/${id}/mark-as-seen`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ seen: true }),
                }
            );
            const updatedNotifications = notifications.map((notification) =>
                notification.id === id
                    ? { ...notification, seen: true }
                    : notification
            );
            setNotifications(updatedNotifications);
        } catch (error) {
            console.error("Error marking notification as seen:", error);
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <Flex
            align="center"
            justify="space-between"
            display="flex"
            h="60px"
            px="15px"
            bg={colorMode === "light" ? "gray.50" : "#1a1c1cd7"}
        >
            <Flex gap={5}>
                <NavLink to="/">
                    <Flex
                        gap={5}
                        alignContent={"center"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Box
                            color={
                                colorMode === "light" ? "teal.300" : "teal.300"
                            }
                        >
                            <FaBookReader fontSize={25} />
                        </Box>
                        <Text
                            fontSize={"xl"}
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                            color={
                                colorMode === "light" ? "gray.900" : "gray.50"
                            }
                            fontFamily={"fantasy"}
                            letterSpacing={"5px"}
                        >
                            Lumina Read
                        </Text>
                    </Flex>
                </NavLink>
                <Flex gap="5px" alignItems={"center"} justifyContent={"center"}>
                    <NavLink to="/marketplace">
                        <Button
                            size={"sm"}
                            color={
                                colorMode === "light" ? "gray.900" : "gray.300"
                            }
                            variant="ghost"
                            gap={1}
                            fontFamily={"unset"}
                            fontSize={"15px"}
                        >
                            Market Place
                            <BsStars
                                color={
                                    colorMode === "light" ? "orange" : "Yellow"
                                }
                            />
                        </Button>
                    </NavLink>
                </Flex>
            </Flex>

            <Flex alignItems={"center"} gap={3}>
                <ThemeSwitcher />

                {isLoggedIn ? (
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
                                                    {notification.content}
                                                    <Text
                                                        fontSize="xs"
                                                        color="gray.500"
                                                    >
                                                        {
                                                            notification.created_at
                                                        }
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

                        <Menu>
                            <MenuButton position="relative">
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
                                        src={user.img}
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
                            </MenuButton>
                            <MenuList
                                style={{
                                    minWidth: "150px",
                                    maxWidth: "350px",
                                }}
                                zIndex={100}
                            >
                                <MenuItem
                                    _hover={{
                                        bg: "gray.800",
                                    }}
                                    _focus={{
                                        bg: "gray.800",
                                    }}
                                >
                                    <Text>Settings</Text>
                                </MenuItem>
                                <MenuItem
                                    _hover={{
                                        bg: "gray.800",
                                    }}
                                    _focus={{
                                        bg: "gray.800",
                                    }}
                                    onClick={handleLogout}
                                >
                                    <Text>Logout</Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                ) : (
                    <Flex gap={3}>
                        <NavLink to="/Auth/login">
                            <Button size={"sm"}>Login</Button>
                        </NavLink>
                        <NavLink to="/Auth/signup">
                            <Button size={"sm"}>Sign up</Button>
                        </NavLink>
                    </Flex>
                )}
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
