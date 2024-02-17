import {
    Image,
    Flex,
    Box,
    Input,
    Button,
    Text,
    Divider,
} from "@chakra-ui/react";

function Auth() {
    return (
        <Flex
            h={"calc(100vh - 60px)"}
            justifyContent={"space-between"}
            gap={5}
            alignItems={"center"}
            overflow={"hidden"}
        >
            <Box w={"100%"} minH={"100%"} rounded={20} overflow={"hidden"}>
                <Image
                    // src="https://i.gyazo.com/b4d5103f2b05bc33c72405d00609aacd.png"
                    src="https://i.gyazo.com/1be7fe0eaa2ecc1de5e9c87247266228.png"
                    objectFit="cover"
                    w={"100%"}
                    rounded={20}
                />
            </Box>
            <Flex
                flexDirection={"column"}
                w={"750px"}
                justifyContent={"center"}
                alignItems={"center"}
                p={5}
            >
                <Text fontSize="2xl" mb={4}>
                    Welcome Back!
                </Text>
                <Divider mb={4} w={"50%"} />
                <Flex flexDirection={"column"} mb={4}>
                    <Input variant="filled" placeholder="Username" mb={3} />
                    <Input
                        variant="filled"
                        placeholder="Password"
                        type="password"
                        mb={3}
                    />
                    <Button colorScheme="blue" mb={3}>
                        Login
                    </Button>
                    <Text fontSize="sm">
                        Forgot your password?{" "}
                        <Text as="span" color="blue.500" cursor="pointer">
                            Reset here
                        </Text>
                    </Text>
                </Flex>
                <Divider w={"50%"} />
                <Text mt={4} fontSize="sm">
                    Don't have an account?{" "}
                    <Text as="span" color="blue.500" cursor="pointer">
                        Sign up now
                    </Text>
                </Text>
            </Flex>
        </Flex>
    );
}

export default Auth;
