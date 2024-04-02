import { useEffect, useState } from "react";
import { Box, Flex, Text, Divider, Button, Image, useToast } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

interface Item {
    img: string | undefined;
    id: number;
    title: string;
    category: string;
    price: number;
}

const CartContent: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const toast = useToast();
    const id= localStorage.getItem('id');

    useEffect(() => {
        const storedItems = localStorage.getItem("cart");
        if (storedItems) {
            const parsedItems: Item[] = JSON.parse(storedItems);
            const itemsWithParsedPrice = parsedItems.map((item) => ({
                ...item,
                price: parseFloat(item.price.toString()), // Parse the price to a number
            }));
            setItems(itemsWithParsedPrice);
        }

       
    }, []);

    const totalPrice = items.reduce((acc, item) => {
        const price =
            typeof item.price === "number"
                ? item.price
                : parseFloat(item.price as string);
        if (!isNaN(price)) {
            // Use Number() to ensure price is treated as a number
            return acc + Number(price);
        }
        return acc;
    }, 0);

    const removeFromCart = (id: number) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
    };

    const order = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: id,
                    packs_ids: items.map(item => item.id), // Envoyer tous les IDs des packs dans le panier
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const orderData = await response.json();
            console.log('Order created successfully:', orderData);
            toast({
                title: "Order created successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Effacer le panier après la commande
            localStorage.removeItem("cart");
            setItems([]);
        } catch (error:any) {
            console.error('Error creating order:', error);
            toast({
                title: "Error creating order",
                status: "error",
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
                                    {item.price.toFixed(2)}{" "}
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
                <Button mt={4} colorScheme="blue" size="md" w={"100%"} onClick={order}>
                    Confirm Purchase
                </Button>
            </Box>
        </Flex>
    );
};

export default CartContent;
