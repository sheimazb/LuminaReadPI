import { Image, Flex, Box } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import { useParams } from "react-router-dom";

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
            <Box w={"100%"} minH={"100%"} overflow={"hidden"}>
                <Image
                    // src="https://i.gyazo.com/b4d5103f2b05bc33c72405d00609aacd.png"
                    // src="https://i.gyazo.com/ecffc0794b4adea89f54036d0653fb08.png"
                    // src="https://i.gyazo.com/1be7fe0eaa2ecc1de5e9c87247266228.png"
                    src="https://i.gyazo.com/4d2614e46bda0a26c049e4ea38b0ac63.png"
                    objectFit="cover"
                    w={"100%"}
                />
            </Box>
        </Flex>
    );
}

export default Auth;
