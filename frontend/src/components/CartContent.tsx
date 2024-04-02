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
    const id= localStorage.getItem('id');

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
            await addNotification();

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

    const addNotification = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/add-notification/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: "Votre commande a été passée avec succès.",
                    seen: false,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add notification');
            }
    
            const responseData = await response.json();
            console.log('Notification added successfully:', responseData);
        } catch (error:any) {
            console.error('Error adding notification:', error);
            toast({
                title: "Error adding notification",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
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
                <Button mt={4} colorScheme="blue" size="md" w={"100%"} onClick={confirmPurchase} > confirmr </Button>
                <Button mt={4} colorScheme="blue" size="md" w={"100%"} onClick={order}>
                    Confirm Purchase
                </Button>
            </Box>
        </Flex>
    );
};

export default CartContent;
