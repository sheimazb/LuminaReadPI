import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Text,
    Image,
    Button,
    Popover,
    PopoverArrow,
    PopoverTrigger,
    PopoverCloseButton,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    RadioGroup,
    Stack,
    Radio,
    Textarea,
    CardBody,
    Card,
} from "@chakra-ui/react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { MdGTranslate } from "react-icons/md";
import translateData from "../../apis/AiTranslation"; // Import de la fonction de traduction
import axios from "axios";

interface Novella {
    id: number;
    title: string;
    description: string;
    img: string; // Corrected img type
}

const Novella: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [novella, setNovella] = useState<Novella | null>(null);
    const [formData, setFormData] = useState({
        language: "Hindi",
        message: "",
    });
    const [translation, setTranslation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadNovella = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/novellas/${id}`
                );
                setNovella(response.data);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement de la novella:",
                    error
                );
            }
        };

        loadNovella();
    }, [id]);

    const handleTranslationSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const translationData = await translateData(
                formData.message,
                formData.language
            );
            setTranslation(translationData[0].texts);

            setIsLoading(false);
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la traduction :",
                error
            );
            setIsLoading(false);
        }
    };
    return (
        < Box bg={'black'}>
            <Flex
                w={"1200px"}
                pt={20}
                ml={"auto"}
                mr={"auto"}
                gap={3}
                flexDirection={"column"}
            >
                {novella && ( // Check if novella is loaded before rendering
                    <Flex
                        h={260}
                        w={"100%"}
                        border={"var(--bordercolor) solid 1px"}
                        rounded={10}
                        position={"relative"}
                        overflow={"hidden"}
                    >
                        <Image
                            src={novella.img} // Use novella.img for image source
                            w={"100%"}
                            objectFit={"cover"}
                        />
                        <Box
                            position={"absolute"}
                            top={0}
                            bottom={0}
                            left={0}
                            right={0}
                            bgGradient="linear(to-b,  #1b202d , transparent )"
                        />
                        <Box position={"absolute"} top={4} maxW={"800px"}>
                            <Flex flexDirection={"column"} px={5}>
                                <Text fontSize={"3xl"}>{novella.title}</Text>
                                <Text color={"gray.400"}>
                                    {novella.description}
                                </Text>
                            </Flex>
                        </Box>
                        <Box position={"absolute"} bottom={4} left={5}>
                            <NavLink to={`/novella/${id}/read`}>
                                <Button
                                    mt={5}
                                    mr={3}
                                    colorScheme="cyan"
                                    size={"sm"}
                                >
                                    Read
                                </Button>
                            </NavLink>
                            <NavLink to={`/novella/${id}/forum`}>
                                <Button mt={5} mr={3} size={"sm"}>
                                    Forum
                                </Button>
                            </NavLink>
                        </Box>
                    </Flex>
                )}

                <Flex
                    w={"100%"}
                    m={"10px auto"}
                    gap={3}
                    flexDirection={"column"}
                >
                    <Outlet />
                </Flex>

                {/* Footer Section */}
            </Flex>
            <Flex
                w={"100%"}
                p={5}
                mt={109}
                pr={40}
                justifyContent={"end"}
                alignItems={"center"}
            >
                <Popover placement="top">
                    <PopoverTrigger>
                        <Button
                            borderRadius={50}
                            bgColor={"cadetblue"}
                            h={"50px"}
                        >
                            <MdGTranslate fontSize={25} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Translation</PopoverHeader>
                        <PopoverBody>
                            <Flex flexDirection={"column"} gap={2}>
                                <form onSubmit={handleTranslationSubmit}>
                                    <RadioGroup
                                        value={formData.language}
                                        onChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                language: value,
                                            })
                                        }
                                    >
                                        <Stack direction="row">
                                            <Radio value="fr" name="language">
                                                Français
                                            </Radio>
                                            <Radio value="en" name="language">
                                                English
                                            </Radio>
                                            <Radio value="zh" name="language">
                                                Arabic
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                    <Textarea
                                        mt={2}
                                        placeholder="Type your message here"
                                        name="message"
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                message: e.target.value,
                                            })
                                        }
                                    />
                                    <Button
                                        type="submit"
                                        mt={2}
                                        isLoading={isLoading}
                                    >
                                        Translate
                                    </Button>
                                </form>
                                <Text>Translated text</Text>
                                <Card
                                    border={"1px solid "}
                                    borderColor={"gray.600"}
                                >
                                    <CardBody>
                                        <Text color={"pink.200"}>
                                            {translation}
                                        </Text>
                                    </CardBody>
                                </Card>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Flex>
        </ Box>
    );
};

export default Novella;
