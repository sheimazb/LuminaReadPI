import {
    Flex,
    Select,
    Input,
    Textarea,
    Button,
    Box,
    Wrap,
    Text,
    Tag,
    TagLabel,
    TagRightIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaCopy, FaPause, FaStop } from "react-icons/fa";
import { VscDebugContinue, VscDebugStart } from "react-icons/vsc";

const TextReader = () => {
    const [textToSpeak, setTextToSpeak] = useState(
        "make the reading interface. better and add "
    );
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] =
        useState<SpeechSynthesisVoice | null>(null);
    const [pitch, setPitch] = useState<number>(1);
    const [rate, setRate] = useState<number>(1);
    const [volume, setVolume] = useState<number>(1);
    const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
        null
    );
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
    const [expectedReadingTime, setExpectedReadingTime] = useState<string>("");

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
        const readingSpeed = 200; // average words per minute
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
            newUtterance.pitch = pitch;
            newUtterance.rate = rate;
            newUtterance.volume = volume;

            newUtterance.onboundary = (event) => {
                const charIndex = event.charIndex;
                const words = textToSpeak.split(" ");
                let currentCharIndex = 0;
                for (let i = 0; i < words.length; i++) {
                    if (
                        charIndex >= currentCharIndex &&
                        charIndex < currentCharIndex + words[i].length
                    ) {
                        setCurrentWordIndex(i);
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
        setCurrentWordIndex(-1); // Reset word highlight when speech is stopped
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextToSpeak(e.target.value);
    };

    return (
        <Flex maxW={"1400px"} flexDirection="column" p={3} m={"auto"}>
            <Wrap w={"100%"} gap={2}>
                <Button size={"sm"} onClick={speakText}>
                    <Box fontSize={"sm"}>
                        <VscDebugStart />
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
                <Tag colorScheme="cyan" variant="solid" ml={7}>
                    <TagLabel>Copy Link</TagLabel>
                    <TagRightIcon boxSize="12px" as={FaCopy} />
                </Tag>
            </Wrap>

            <Flex
                justifyContent={"space-between"}
                w={"100%"}
                flexDirection={"column"}
            >
                <Textarea
                    value={textToSpeak}
                    onChange={handleTextChange}
                    placeholder="Enter text to speak..."
                    w={"100%"}
                    mt="20px"
                />
                <Text mt={2} fontSize="sm" color={"cyan.500"}>
                    Expected Reading Time: {expectedReadingTime}
                </Text>
                <Wrap mt={4} spacing={1}>
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
    );
};

export default TextReader;
