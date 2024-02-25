import React from "react";
import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Select,
    Heading,
    Image,
    CardBody,
    Stack,
    Textarea,
    Button,
    Wrap,
    Card,
    Flex,
    Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const AddNovella = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };
    return (
        <Box
            className="container"
            w="600px"
            margin="3rem auto"
            bgPosition="0 0"
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            flexDirection="column"
            justifyContent="flex-end"
            padding="3rem"
            display="flex"
        >
            <Wrap w={"100%"} p={2}>
                <Card
                    bg={"transparent"}
                    border={"var(--bordercolor) solid 1px "}
                    p={0}
                >
                    <CardBody>
                        <Box w="600px" onClick={handleImageClick}>
                            {image ? (
                                <Image
                                    src={image}
                                    alt="Selected Image"
                                    className="post-big-border__video is-success anim"
                                    loading="lazy"
                                    data-submit-anim=""
                                    objectFit="cover"
                                    borderRadius="lg"
                                    w={"100%"}
                                    h="140px"
                                />
                            ) : (
                                <Image
                                    borderRadius="full"
                                    boxSize="150px"
                                    objectFit="cover"
                                    src="https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1.jpg"
                                    className="post-big-border__video is-success anim"
                                />
                            )}
                            <input
                                type="file"
                                ref={inputRef}
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            ></input>
                        </Box>

                        <Stack mt="3" spacing="1">
                            <Input
                                placeholder="place the title of the novel"
                                htmlSize={500}
                                width="20rem"
                                height="30px"
                            />
                            <Input
                                mt={2}
                                placeholder="place a description of the novel"
                                htmlSize={500}
                                width="20rem"
                                height="60px"
                            />
                            <Textarea
                                placeholder="Enter text to speak..."
                                mt={2}
                                height={100}
                            />
                            <Button mt={2} size={"sm"}>
                                Add
                            </Button>
                        </Stack>
                    </CardBody>
                </Card>
            </Wrap>
        </Box>
    );
};

export default AddNovella;
