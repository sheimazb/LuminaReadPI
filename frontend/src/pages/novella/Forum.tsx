import { Flex, Text, Image, Button, Textarea } from "@chakra-ui/react";
import { FaCommentAlt } from "react-icons/fa";
const Forum = () => {
    return (
        <Flex justifyContent={"space-between"} gap={3}>
            <Flex
                w={"100%"}
                p={3}
                rounded={10}
                flexDirection={"column"}
                gap={3}
            >
                <Flex alignItems={"center"} gap={3}>
                    <FaCommentAlt /> <Text>5 Comments</Text>
                </Flex>
                <Flex flexDirection={"column"} gap={1}>
                    <Text fontSize={"sm"}>Comment as Saif Eddine Jelassi</Text>
                    <Textarea placeholder="Here is a sample placeholder" />
                </Flex>
                <Flex alignItems={"start"} gap={3} mt={2}>
                    <Image
                        src="https://i.gyazo.com/83ece1f06f397ab5928a6b9944a27146.png"
                        h={"30px"}
                        w={"30px"}
                        rounded={"50%"}
                    />
                    <Flex flexDirection={"column"}>
                        <Flex gap={1} alignItems={"center"}>
                            <Text as="b">Saif Eddine Jelassi</Text>
                            <Text fontSize={"sm"}>15 june ,2013</Text>
                        </Flex>
                        <Text color={"gray.400"}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Dolore laborum suscipit temporibus eum nobis
                            atque a, earum esse accusamus minus vero! Quod
                            dolorum eum ducimus voluptatum voluptates harum,
                            provident ullam!
                        </Text>
                        <Flex gap={2}>
                            <Button mt={2} size={"xs"}>
                                Edit
                            </Button>
                            <Button mt={2} size={"xs"}>
                                Delete
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                w={"350px"}
                border={"var(--bordercolor) solid 1px"}
                p={3}
                rounded={10}
            >
                News
            </Flex>
        </Flex>
    );
};
export default Forum;
