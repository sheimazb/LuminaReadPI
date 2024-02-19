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
    Stack,
    CardBody,
    Heading,
    Card,
    Divider,
    Tag,
    TagLabel,
} from "@chakra-ui/react";
import { FaSearch, FaStar } from "react-icons/fa";

const Profile = () => {
    const range = (n: number) => [...Array(n).keys()];

    return (
        <Box maxW={"1230px"} m={"30px auto"}>
            <Flex flexDirection={"column"} gap={1} alignItems={"center"}>
                <Image
                    src="https://i.gyazo.com/df168e15d60588f5f47e2faa9e9cae6c.png"
                    w={16}
                    h={16}
                    rounded={20}
                    ml={1}
                />
                <Text fontSize={"xl"}>Saif Eddine Jelassi</Text>
                <Flex alignItems={"center"} gap={"5px"} color={"yellow.300"}>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </Flex>

                <Text color={"gray.400"} maxW={300} textAlign={"center"}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </Text>
                <Flex gap={1}>
                    <Tag size="md" colorScheme="cyan" borderRadius="full">
                        <TagLabel>Pro</TagLabel>
                    </Tag>
                    <Tag size="md" colorScheme="orange" borderRadius="full">
                        <TagLabel>Good Reader</TagLabel>
                    </Tag>
                    <Tag size="md" colorScheme="green" borderRadius="full">
                        <TagLabel>professional writer</TagLabel>
                    </Tag>
                    <Tag size="md" colorScheme="purple" borderRadius="full">
                        <TagLabel>High tech</TagLabel>
                    </Tag>
                </Flex>
            </Flex>
            <Flex mt={10}>
                <InputGroup size="md">
                    <Input
                        borderColor={"gray.700"}
                        placeholder="Search section"
                    />
                    <InputRightElement>
                        <Button size="xs" mr={1} color={"white"}>
                            <FaSearch />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <Wrap minH={500} mt={3}>
                {range(10).map((index) => (
                    <Box
                        h={280}
                        w={300}
                        rounded={10}
                        border={" solid 1px "}
                        borderColor={"gray.600"}
                        overflow={"hidden"}
                        p={2}
                    >
                        <Image
                            src="https://i.gyazo.com/933ed1aa06f63a98d12891af67fbcee0.jpg"
                            maxH={120}
                            w={"100%"}
                            objectFit={"cover"}
                            rounded={5}
                        />
                        <Text as={"b"} mt={2}>
                            Lorem ipsum dolor sit amet adipi .
                        </Text>
                        <Text color={"gray.400"}>
                            Lorem ipsum dolor sit amet adipi amet adipi .
                        </Text>
                        <Flex
                            alignItems={"center"}
                            gap={"5px"}
                            color={"yellow.300"}
                            fontSize={"xs"}
                            mt={3}
                        >
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </Flex>
                        <Button mt={3} w={"100%"}>
                            Check
                        </Button>
                    </Box>
                ))}
            </Wrap>
        </Box>
    );
};

export default Profile;
