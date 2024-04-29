import { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    PinInput,
    PinInputField,
    Text,
    useColorMode,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaReadme } from "react-icons/fa";
import { FaEarListen, FaHandPeace, FaPenClip } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";

const Homepage = () => {
    const [code, setCode] = useState(null);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showCreateFields, setShowCreateFields] = useState(false);
    const [PinCode, setPinCode] = useState("");
    const toast = useToast();

    const handleAddText = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/AddText",
                {
                    text_content: "Your default text content here",
                    pin: PinCode,
                }
            );
            toast({
                title: "Congrats !",
                status: "info",
                duration: 800,
                position: "top-right",
            });
        } catch (error) {
            console.error("Error adding text:", error);
        }
    };

    const handleLogCod = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/LogCode",
                {
                    pin: PinCode,
                }
            );
            console.log(response.data);
            setCode(response.data.code);
            navigate(`/TextReader/${response.data.code}`);
        } catch (error) {
            console.error("Error logging code:", error);
            toast({
                title: "Error",
                description: "Invalid PIN code",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handlePinInputChange = (value: any) => {
        setPinCode(value);
    };

    const onCreateOneClick = () => setShowCreateFields(true);
    const EnterModeOnClick = () => setShowCreateFields(false);
    const { colorMode } = useColorMode();

    return (
        <Box bg={colorMode === "light" ? "gray.300" : "black"}>
            <Flex
                h={"calc(70vh - 10px)"}
                alignContent={"center"}
                justifyContent={"center"}
            >
                <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                >
                    <Text
                        letterSpacing="30px"
                        fontSize={"6xl"}
                        w={"max-content"}
                        textAlign={"center"}
                        fontFamily={"fantasy"}
                    >
                        LUMINA READ
                    </Text>
                    <Text
                        fontSize={"xl"}
                        color={colorMode === "light" ? "gray.500" : "gray.400"}
                        textAlign={"left"}
                        mt={7}
                    >
                        Our products allow individuals to monetize their
                        footprint on the internet.
                    </Text>
                    <Box textAlign={"center"}>
                        <Button
                            colorScheme="cyan"
                            variant="outline"
                            mt={10}
                            rounded={20}
                            mr={2}
                            onClick={onOpen}
                        >
                            Text Reader
                        </Button>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent mt={"10%"} minW={"650px"} bg={'teal.900'}>
                                <ModalHeader>
                                    <Flex gap={3} alignItems={"center"}>
                                        <Text color={"yellow.100"}>
                                            Welcome my friend
                                        </Text>
                                        <FaHandPeace
                                            color="yellow"
                                            fontSize={"20"}
                                        />
                                    </Flex>
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Flex
                                        flexDirection={"column"}
                                        gap={3}
                                        textAlign={"justify"}
                                    >
                                        <Text>
                                            We can assist you in uploading and
                                            composing any text you desire, and
                                            also provide support for reading it
                                            aloud using intelligent voice
                                            technology.
                                        </Text>
                                        <Text color={"gray.400"}>
                                            To access, enter your PIN code. If
                                            you don't have one, you can create
                                            it.
                                        </Text>

                                        {!showCreateFields ? (
                                            <form>
                                                <Flex
                                                    direction={"column"}
                                                    gap={3}
                                                    mt={20}
                                                >
                                                    <HStack
                                                        justifyContent={
                                                            "center"
                                                        }
                                                    >
                                                        <PinInput
                                                            onChange={(value) =>
                                                                handlePinInputChange(
                                                                    value
                                                                )
                                                            }
                                                        >
                                                            <PinInputField type="password" />
                                                            <PinInputField type="password" />
                                                            <PinInputField type="password" />
                                                            <PinInputField type="password" />
                                                        </PinInput>
                                                    </HStack>

                                                    <Link
                                                        textAlign={"center"}
                                                        color={"cyan.300"}
                                                        onClick={
                                                            onCreateOneClick
                                                        }
                                                    >
                                                        Create one ?
                                                    </Link>
                                                </Flex>
                                            </form>
                                        ) : (
                                            <form>
                                                <Flex
                                                    direction={"column"}
                                                    gap={3}
                                                    mt={5}
                                                >
                                                    <Text>
                                                        Create your personnel
                                                        code
                                                    </Text>
                                                    <HStack
                                                        justifyContent={
                                                            "center"
                                                        }
                                                    >
                                                        <PinInput
                                                            onChange={(value) =>
                                                                handlePinInputChange(
                                                                    value
                                                                )
                                                            }
                                                        >
                                                            <PinInputField type="password" />
                                                            <PinInputField type="password" />
                                                            <PinInputField type="password" />
                                                            <PinInputField type="password" />
                                                        </PinInput>
                                                    </HStack>

                                                    <Link
                                                        textAlign={"center"}
                                                        color={"cyan.300"}
                                                        onClick={
                                                            EnterModeOnClick
                                                        }
                                                    >
                                                        You already have one. ?
                                                    </Link>
                                                </Flex>
                                            </form>
                                        )}
                                    </Flex>
                                </ModalBody>

                                <ModalFooter>
                                    {!showCreateFields ? (
                                        <Button
                                            variant="outline"
                                            colorScheme="pink"
                                            rounded={20}
                                            rightIcon={<IoIosArrowForward />}
                                            onClick={handleLogCod}
                                        >
                                            Done
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            colorScheme="pink"
                                            rounded={20}
                                            rightIcon={<IoIosArrowForward />}
                                            onClick={handleAddText}
                                        >
                                            Save
                                        </Button>
                                    )}
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    
                    </Box>
                </Flex>
            </Flex>
            <Box>
                <Box minH={255} position={"relative"}>
                    faz
                </Box>
                <Box
                    position={"absolute"}
                    h={"600px"}
                    top={"-10px"}
                    left={"-150px"}
                    width={"30%"}
                    borderRadius={"100% 100% 0px 0px"}
                    backgroundImage={
                        "url('https://static.vecteezy.com/system/resources/previews/022/130/033/non_2x/background-of-tropical-plant-leaves-in-light-gray-free-png.png')"
                    }
                    backgroundSize={"cover"}
                    transform={"rotate(180deg)"}
                ></Box>
                <Box
                    position={"absolute"}
                    h={"600px"}
                    bottom={"-90px"}
                    right={"-150px"}
                    width={"30%"}
                    borderRadius={"100% 100% 0px 0px"}
                    backgroundImage={
                        "url('https://static.vecteezy.com/system/resources/previews/022/130/033/non_2x/background-of-tropical-plant-leaves-in-light-gray-free-png.png')"
                    }
                    backgroundSize={"cover"}
                ></Box>
                <Box
                    position={"absolute"}
                    h={"50px"}
                    top={"450px"}
                    left={"34%"}
                >
                    <Divider mb={10} />

                    <Flex gap={"200px"}>
                        <Flex
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={2}
                        >
                            <FaReadme fontSize={50} color="gray" />
                            <Text as={"b"} fontSize={"xl"}>
                                Read
                            </Text>
                        </Flex>
                        <Flex
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={2}
                        >
                            <FaPenClip fontSize={50} color="gray" />
                            <Text as={"b"} fontSize={"xl"}>
                                Write
                            </Text>
                        </Flex>
                        <Flex
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={2}
                        >
                            <FaEarListen fontSize={50} color="gray" />
                            <Text as={"b"} fontSize={"xl"}>
                                Listen
                            </Text>
                        </Flex>
                    </Flex>
                    <Divider mt={10} />
                </Box>
            </Box>
        </Box>
    );
};

export default Homepage;