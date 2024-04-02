import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Divider, Button, Image , useToast} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export interface Item {
    img: string | undefined;
    id: number;
    title: string;
    category: string;
    price: number | undefined; // Change the type to handle possible null values
}

const CartContent: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();

    const toast = useToast();
    useEffect(() => {
        const storedItems = localStorage.getItem("cart");
        if (storedItems) {
            const parsedItems: Item[] = JSON.parse(storedItems);
            const itemsWithParsedPrice = parsedItems.map((item) => ({
                ...item,
                price: typeof item.price === 'string' ? parseFloat(item.price) : item.price || 0, // Initialize price to 0 if null or undefined
            }));
            setItems(itemsWithParsedPrice);
        }
    }, []);

    const totalPrice = items.reduce((acc, item) => {
        const price = item.price || 0; // Initialize price to 0 if null or undefined
        return acc + price;
    }, 0);

    const removeFromCart = (id: number) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
    };

    const confirmPurchase = () => {
        const isLoggedIn = localStorage.getItem("token");
        if (isLoggedIn) {
            navigate("/ConfirmPurchase");
        } else {
            toast({
                title: "Please log in",
                description: "You need to log in to confirm your purchase.",
                status: "info",
                duration: 3000, 
                isClosable: true, 
            });
        }
    };

    return (
        <Flex
            height={"100%"}
            justifyContent={"space-between"}
            flexDirection={"column"}
        >
            <Box>
                {items.map((item) => (
                    <Box
                        key={item.id}
                        p={3}
                        bg={"var(--chakra-colors-chakra-body-bg)"}
                        mb={3}
                        rounded={3}
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Flex alignItems="center" gap={2}>
                                <Image
                                    src={item.img}
                                    w={70}
                                    h={70}
                                    rounded={5}
                                />
                                <Box>
                                    <Text fontSize="md">{item.title}</Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {item.category}
                                    </Text>
                                </Box>
                            </Flex>
                            <Flex flexDirection={"column"} alignItems={"end"}>
                                <Text
                                    fontSize="sm"
                                    fontWeight="bold"
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                >
                                    {item.price ? item.price.toFixed(2) : "0.00"}{" "}
                                    <Text fontSize={"xs"} color={"gray.400"}>
                                        DT
                                    </Text>
                                </Text>
                                <Button
                                    size={"xs"}
                                    color="red.400"
                                    mt={3}
                                    w={30}
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <MdDelete />
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </Box>
            <Box mb={4}>
                <Divider my={5} />
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="md" fontWeight="bold">
                        Total:
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                        ${totalPrice.toFixed(2)}
                    </Text>
                </Flex>
                <Button mt={4} colorScheme="blue" size="md" w={"100%"} onClick={confirmPurchase} >
                    Confirm Purchase
                </Button>
            </Box>
        </Flex>
    );
};

export default CartContent;
