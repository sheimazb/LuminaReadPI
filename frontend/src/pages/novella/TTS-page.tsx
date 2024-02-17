import { Flex, Select, Input, Textarea, Button, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaPause, FaStop } from "react-icons/fa";
import { VscDebugContinue, VscDebugStart } from "react-icons/vsc";

const TTS = () => {
    const [textToSpeak, setTextToSpeak] = useState("Your default text here");
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

    const speakText = () => {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;
        synth?.speak(utterance);
        setUtterance(utterance);
    };

    const pauseSpeech = () => {
        synth?.pause();
    };

    const stopSpeech = () => {
        synth?.cancel();
    };

    const continueSpeech = () => {
        synth?.resume();
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextToSpeak(e.target.value);
    };

    return (
        <Flex
            w={"1400px"}
            justify="center"
            align="center"
            flexDirection="column"
            m={"40px auto"}
        >
            <Flex w={"100%"} justify="center" align="center" gap={2}>
                <Select
                    value={selectedVoice ? selectedVoice.name : ""}
                    onChange={(e) => {
                        const voiceName = e.target.value;
                        const voice = voices.find(
                            (voice) => voice.name === voiceName
                        );
                        setSelectedVoice(voice || null);
                    }}
                >
                    <option value="">Select a voice...</option>
                    {voices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {voice.name}
                        </option>
                    ))}
                </Select>
                <Input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                />
                <Input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                />
                <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
                <Button onClick={speakText}>
                    <Box fontSize={"md"}>
                        <VscDebugStart />
                    </Box>
                </Button>
                <Button onClick={pauseSpeech}>
                    <Box fontSize={"md"}>
                        <FaPause />
                    </Box>
                </Button>
                <Button onClick={stopSpeech}>
                    <Box fontSize={"md"}>
                        <FaStop />
                    </Box>
                </Button>
                <Button onClick={continueSpeech}>
                    <Box fontSize={"md"}>
                        <VscDebugContinue />
                    </Box>
                </Button>
            </Flex>
            <Textarea
                value={textToSpeak}
                onChange={handleTextChange}
                placeholder="Enter text to speak..."
                style={{ width: "100%", minHeight: "100px", marginTop: "20px" }}
            />
        </Flex>
    );
};

export default TTS;
