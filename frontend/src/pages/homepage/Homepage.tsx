import { useState } from "react";
import {
    Box,
    Button,
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
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaHandPeace } from "react-icons/fa6";
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

    const handlePinInputChange = (value:any) => {
        setPinCode(value);
    };

    const onCreateOneClick = () => setShowCreateFields(true);
    const EnterModeOnClick = () => setShowCreateFields(false);

    return (
        <Box>
            <Flex
                h={"calc(100vh - 60px)"}
                alignContent={"center"}
                justifyContent={"center"}
            >
                <Flex
                    alignContent={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                >
                    <Text fontSize={"6xl"} w={"max-content"} textAlign={"center"}>
                        Let your Data do more for you!
                    </Text>
                    <Text fontSize={"xl"} color={"gray.400"} textAlign={"center"} mt={7}>
                        Our products allow individuals to monetize their footprint on the
                        internet.
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
                            <ModalContent mt={"10%"} minW={"650px"}>
                                <ModalHeader>
                                    <Flex gap={3} alignItems={"center"}>
                                        <Text color={"blue.200"}>Welcome my friend</Text>
                                        <FaHandPeace color="yellow" fontSize={"20"} />
                                    </Flex>
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Flex flexDirection={"column"} gap={3} textAlign={"justify"}>
                                        <Text>
                                            We can assist you in uploading and composing any text
                                            you desire, and also provide support for reading it
                                            aloud using intelligent voice technology.
                                        </Text>
                                        <Text color={"gray.400"}>
                                            To access, enter your PIN code. If you don't have one,
                                            you can create it.
                                        </Text>

                                        {!showCreateFields ? (
                                            <form>
                                                <Flex direction={"column"} gap={3} mt={20}>
                                                    <HStack justifyContent={"center"}>
                                                        <PinInput
                                                         onChange={(value) =>
                                                            handlePinInputChange(value)
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
                                                        onClick={onCreateOneClick}
                                                    >
                                                        Create one ?
                                                    </Link>
                                                </Flex>
                                            </form>
                                        ) : (
                                            <form>
                                                <Flex direction={"column"} gap={3} mt={5}>
                                                    <Text>Create your personnel code</Text>
                                                    <HStack justifyContent={"center"}>
                                                        <PinInput
                                                            onChange={(value) =>
                                                                handlePinInputChange(value)
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
                                                        onClick={EnterModeOnClick}
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
                        <Button
                            colorScheme="gray"
                            rightIcon={<FaRegArrowAltCircleRight />}
                            mt={10}
                            variant="outline"
                            rounded={20}
                        >
                            Get in touch
                        </Button>
                    </Box>
                </Flex>
            </Flex>
            <Box minH={900}>faz</Box>
        </Box>
    );
};

export default Homepage;
