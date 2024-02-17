import { Image, Flex, Box } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import { useParams } from "react-router-dom";
import image from "../assets/408abbd0-45d0-417e-8998-4baa364b166a.jpg";
function Auth() {
    const { page } = useParams();
    console.log(page);
    return (
        <Flex
            h={"calc(100vh - 60px)"}
            justifyContent={"space-between"}
            gap={5}
            alignItems={"center"}
            overflow={"hidden"}
        >
            {page === "signup" ? <Login /> : <Signup />}
            <Box
                w={"100%"}
                minH={"100%"}
                overflow={"hidden"}
                position={"relative"}
            >
                <Image src={image} objectFit="cover" w={"100%"} />
                <Box
                    position={"absolute"}
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    bgGradient="linear(to-r,  #1b202d , transparent)"
                />
            </Box>
        </Flex>
    );
}

export default Auth;
