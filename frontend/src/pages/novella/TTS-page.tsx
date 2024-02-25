import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    Flex,
    Textarea,
    Button,
    Box,
    Wrap,
    Text,
    Tag,
    TagLabel,
    TagRightIcon,
} from "@chakra-ui/react";
import { FaCopy, FaPause, FaStepForward, FaStop } from "react-icons/fa";
import { IoQrCodeOutline } from "react-icons/io5";
import { MdTableRows } from "react-icons/md";
import { TfiLayoutColumn3Alt } from "react-icons/tfi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const TTS = () => {
    const [textToSpeak, setTextToSpeak] = useState("");
    const [originalText, setOriginalText] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] =
        useState<SpeechSynthesisVoice | null>(null);
    const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
        null
    );
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
    const [expectedReadingTime, setExpectedReadingTime] = useState<string>("");
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
    const [consecutiveTrueCount, setConsecutiveTrueCount] = useState<number>(0);
    const textRef = useRef<HTMLDivElement>(null);
    const [isBoxVisible, setIsBoxVisible] = useState<boolean>(true);
    const toggleTextVisibility = () => {
        setIsBoxVisible(!isBoxVisible);
    };

    useEffect(() => {
        fetchTextFromDatabase();
    }, []);

    const fetchTextFromDatabase = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/text/65d6730d5d46b                                                                                                          "
            );

            setTextToSpeak(response.data.text_content);
            setOriginalText(response.data.text_content);
        } catch (error) {
            console.error("Error fetching text:", error);
        }
    };
    const updateTextToDatabase = async () => {
        setIsUpdating(true);
        try {
            let dataToSend = { text_content: textToSpeak };

            await axios.put(
                `http://localhost:8000/api/updateText/65d6730d5d46b `,
                dataToSend
            );
            setOriginalText(textToSpeak);
        } catch (error) {
            console.error("Error Updating text:", error);
        }
        setIsUpdating(false);
    };

    useEffect(() => {
        const synth = window.speechSynthesis;
        setSynth(synth);
        synth.onvoiceschanged = () => {
            const voices = synth.getVoices();
            setVoices(voices);
            const defaultVoice = voices.find((voice) =>
                voice.lang.includes("en")
            );
            setSelectedVoice(defaultVoice || null);
        };
    }, []);

    useEffect(() => {
        const words = textToSpeak.split(" ").filter((word) => word !== "");
        const readingSpeed = 160;
        const readingTimeInMinutes = words.length / readingSpeed;
        const minutes = Math.floor(readingTimeInMinutes);
        const seconds = Math.ceil((readingTimeInMinutes - minutes) * 60);
        setExpectedReadingTime(`${minutes} min ${seconds} sec`);
    }, [textToSpeak]);

    const speakText = () => {
        if (synth && synth.paused && utterance) {
            synth.resume();
        } else {
            const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
            if (selectedVoice) {
                newUtterance.voice = selectedVoice;
            }
            newUtterance.pitch = 1;
            newUtterance.rate = 0.7;
            newUtterance.volume = 1;

            newUtterance.onboundary = (event) => {
                const charIndex = event.charIndex;
                const words = textToSpeak.split(" ");
                let currentCharIndex = 0;
                let currentWord = "";
                let prevIsOverflowing = true;

                for (let i = 0; i < words.length; i++) {
                    if (
                        charIndex >= currentCharIndex &&
                        charIndex < currentCharIndex + words[i].length
                    ) {
                        setCurrentWordIndex(i);
                        currentWord = words[i];
                        if (textRef.current) {
                            const boxTop =
                                textRef.current.getBoundingClientRect().top;
                            const boxBottom =
                                textRef.current.getBoundingClientRect().bottom;
                            const windowHeight = window.innerHeight;
                            const isOverflowing =
                                boxTop < windowHeight && boxBottom > 0;
                            setIsOverflowing(isOverflowing);
                            if (isOverflowing !== prevIsOverflowing) {
                                setConsecutiveTrueCount(
                                    (prevCount) => prevCount + 1
                                );
                                console.log(
                                    "consecutiveTrueCount:",
                                    consecutiveTrueCount
                                );
                            }
                        }
                        break;
                    }
                    currentCharIndex += words[i].length + 1;
                }
            };

            newUtterance.onend = () => {
                setCurrentWordIndex(-1);
                setConsecutiveTrueCount(0);
            };

            synth?.speak(newUtterance);
            setUtterance(newUtterance);
        }
    };

    const pauseSpeech = () => {
        synth?.pause();
    };

    const stopSpeech = () => {
        synth?.cancel();
        setCurrentWordIndex(-1);
        setConsecutiveTrueCount(0);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextToSpeak(e.target.value);
    };

    const isTextChanged = textToSpeak !== originalText;

    return (
        <Box h={"calc(100vh - 180px)"}>
            <Flex maxW={"1400px"} flexDirection="column" p={3} m={"auto"}>
                <Flex
                    w={"100%"}
                    justifyContent={"space-between"}
                    position={"sticky"}
                    top={0}
                    zIndex={2}
                    bg={"var(--chakra-colors-chakra-body-bg)"}
                    py={2}
                    borderColor={"gray.700"}
                >
                    <Flex gap={2}>
                        <Button size={"sm"} onClick={speakText}>
                            <Box fontSize={"sm"}>
                                <FaStepForward />
                            </Box>
                        </Button>
                        <Button size={"sm"} onClick={pauseSpeech}>
                            <Box fontSize={"sm"}>
                                <FaPause />
                            </Box>
                        </Button>
                        <Button size={"sm"} onClick={stopSpeech}>
                            <Box fontSize={"sm"}>
                                <FaStop />
                            </Box>
                        </Button>
                        <Button
                            size={"sm"}
                            colorScheme="cyan"
                            ml={3}
                            variant="outline"
                            position={"relative"}
                            onClick={updateTextToDatabase}
                            isLoading={isUpdating}
                        >
                            {isTextChanged && (
                                <Box
                                    w={"5px"}
                                    h={"5px"}
                                    rounded={"50%"}
                                    bg={"red"}
                                    position={"absolute"}
                                    top={1}
                                    right={1}
                                ></Box>
                            )}
                            <Text fontSize={"sm"}>Save</Text>
                        </Button>
                        <Tag
                            colorScheme="cyan"
                            variant="solid"
                            ml={3}
                            cursor={"pointer "}
                        >
                            <TagLabel>Copy Link</TagLabel>
                            <TagRightIcon boxSize="12px" as={FaCopy} />
                        </Tag>
                        <Tag
                            bg={"gray.900"}
                            border={"solid 1px "}
                            borderColor={"gray.600"}
                            variant="solid"
                            cursor={"pointer "}
                        >
                            <TagLabel>
                                <IoQrCodeOutline />
                            </TagLabel>
                        </Tag>
                    </Flex>
                </Flex>

                <Flex justifyContent={"space-between"} w={"100%"} gap={3}>
                    <Wrap spacing={1} p={3} rounded={10} mt={2}>
                        {textToSpeak.split(" ").map((word, index) => (
                            <Text
                                key={index}
                                bg={
                                    index === currentWordIndex
                                        ? "cyan.900"
                                        : "transparent"
                                }
                                rounded={3}
                            >
                                {word}
                            </Text>
                        ))}
                    </Wrap>
                </Flex>
            </Flex>
            <Flex
                w={"100%"}
                bg={"gray.700"}
                h={isBoxVisible ? 81 : 0}
                position={"fixed"}
                p={isBoxVisible ? 3 : 0}
                left={0}
                bottom={"0"}
                zIndex={10000}
            >
                <Flex w={"1400px"} m={"auto"} position={"relative"}>
                    {isBoxVisible && (
                        <Flex overflow={"hidden"}>
                            <Text fontSize={"4xl"}>
                                <Wrap
                                    spacingY={8}
                                    px={1}
                                    mt={
                                        isBoxVisible
                                            ? `-${consecutiveTrueCount * 86}px`
                                            : 0
                                    }
                                    transition="margin-top 0.2s ease-in-out"
                                    color={"white"}
                                >
                                    {textToSpeak
                                        .split(" ")
                                        .map((word, index) => (
                                            <Text
                                                key={index}
                                                ref={
                                                    index ===
                                                    currentWordIndex + 1
                                                        ? textRef
                                                        : null
                                                }
                                                bg={
                                                    index === currentWordIndex
                                                        ? "cyan.800"
                                                        : "transparent"
                                                }
                                                rounded={3}
                                            >
                                                {word}
                                            </Text>
                                        ))}
                                </Wrap>
                            </Text>
                        </Flex>
                    )}
                    <Button
                        rounded={"50%"}
                        bg={"gray.600"}
                        position={"absolute"}
                        w={6}
                        h={8}
                        py={5}
                        right={"50%"}
                        left={"50%"}
                        transform={"translate(-50%)"}
                        top={-10}
                        onClick={toggleTextVisibility}
                        color={"white"}
                    >
                        <Box fontSize={"xl"}>
                            {isBoxVisible ? (
                                <IoIosArrowDown />
                            ) : (
                                <IoIosArrowUp />
                            )}
                        </Box>
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};
export default TTS;
