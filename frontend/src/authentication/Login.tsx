import { Flex, Input, Button, Text, Divider } from "@chakra-ui/react";
function Login() {
    return (
        <Flex
            flexDirection={"column"}
            w={"950px"}
            justifyContent={"center"}
            alignItems={"center"}
            p={5}
        >
            <Text fontSize="2xl" mb={5}>
                Welcome Back!
            </Text>
            <Divider mb={5} w={"50%"} />
            <Flex flexDirection={"column"} mb={5}>
                <Input variant="filled" placeholder="Username" mb={3} w={300} />
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
                    Forgot your password?
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
    );
}

export default Login;
