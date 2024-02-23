import { Box, Flex, Text, Divider, Button, Image } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

interface Item {
    id: number;
    name: string;
    author: string;
    price: number;
}

const CartContent: React.FC<{ items: Item[] }> = ({ items }) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <Flex
            height={"100%"}
            justifyContent={"space-between"}
            flexDirection={"column"}
        >
            <Box>
                {items.map((item, index) => (
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
                                    src="https://i.gyazo.com/ee281c082b926babe14d8ee30a9184a3.png"
                                    w={70}
                                    h={70}
                                    rounded={5}
                                />
                                <Box>
                                    <Text fontSize="md">{item.name}</Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {item.author}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {item.author}
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
                <Button mt={4} colorScheme="blue" size="md" w={"100%"}>
                    Confirm Purchase
                </Button>
            </Box>
        </Flex>
    );
};

export default CartContent;
