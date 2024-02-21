import React, { useState, useEffect, useRef } from "react";
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

const TextReader = () => {
    const [textToSpeak, setTextToSpeak] = useState(
        "Intrigued by the mysterious message, Elara decided to embark on a quest to find the lost. Armed with nothing but her courage and determination, she set out into the heart of the Whispering Woods."
    );
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
    const [view, setView] = useState<boolean>(false);
    const changeViewtoColumn = () => {
        setView(true);
    };
    const changeViewtoRow = () => {
        setView(false);
    };
    useEffect(() => {
        const synth = window.speechSynthesis;
        setSynth(synth);
        synth.onvoiceschanged = () => {
            const voices = synth.getVoices();
            setVoices(voices);
            // Set default voice
            const defaultVoice = voices.find((voice) =>
                voice.lang.includes("en")
            );
            setSelectedVoice(defaultVoice || null);
        };
    }, []);

    useEffect(() => {
        const words = textToSpeak.split(" ").filter((word) => word !== "");
        const readingSpeed = 200;
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
            newUtterance.rate = 1;
            newUtterance.volume = 1;

            newUtterance.onboundary = (event) => {
                const charIndex = event.charIndex;
                const words = textToSpeak.split(" ");
                let currentCharIndex = 0;
                let currentWord = "";

                for (let i = 0; i < words.length; i++) {
                    let prevIsOverflowing = true;

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

    return (
        <Box h={"calc(100vh - 180px)"}>
            <Flex maxW={"1400px"} flexDirection="column" p={3} m={"auto"}>
                <Flex
                    w={"100%"}
                    justifyContent={"space-between"}
                    position={"sticky"}
                    top={0}
                    zIndex={2}
                    bg={"gray.800"}
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
                        >
                            <Box
                                w={"5px"}
                                h={"5px"}
                                rounded={"50%"}
                                bg={"red"}
                                position={"absolute"}
                                top={1}
                                right={1}
                            ></Box>
                            <Box fontSize={"sm"}>Save</Box>
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
                    <Flex
                        gap={2}
                        bg={"gray.700"}
                        alignItems={"center"}
                        px={1}
                        rounded={10}
                    >
                        <Button
                            size={"xs"}
                            onClick={changeViewtoRow}
                            bg={view ? "transparent" : "gray.900"}
                        >
                            <Box>
                                <TfiLayoutColumn3Alt />
                            </Box>
                        </Button>
                        <Button
                            size={"xs"}
                            onClick={changeViewtoColumn}
                            bg={view ? "gray.900" : "transparent"}
                        >
                            <Box fontSize={"17px"}>
                                <MdTableRows />
                            </Box>
                        </Button>
                    </Flex>
                </Flex>

                <Flex
                    justifyContent={"space-between"}
                    w={"100%"}
                    flexDirection={view ? "column" : "row"}
                    gap={3}
                >
                    <Box w={view ? "100%" : "50%"}>
                        <Text mt={6} fontSize="sm" color={"cyan.500"}>
                            Expected Reading Time: {expectedReadingTime}
                        </Text>
                        <Textarea
                            value={textToSpeak}
                            onChange={handleTextChange}
                            placeholder="Enter text to speak..."
                            mt={2}
                            height={100}
                        />
                    </Box>
                    <Wrap
                        mt={view ? 0 : 5}
                        spacing={1}
                        p={3}
                        rounded={10}
                        w={view ? "100%" : "50%"}
                    >
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
                                    mt={`-${consecutiveTrueCount * 86}px`}
                                >
                                    {textToSpeak
                                        .split(" ")
                                        .map((word, index) => (
                                            <Text
                                                key={index}
                                                ref={
                                                    index === currentWordIndex
                                                        ? textRef
                                                        : null
                                                }
                                                bg={
                                                    index === currentWordIndex
                                                        ? "pink.700"
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

export default TextReader;
