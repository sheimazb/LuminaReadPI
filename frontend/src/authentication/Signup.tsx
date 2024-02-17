import { Box, Flex, Input, Button, Text, Divider } from "@chakra-ui/react";

function Signup() {
    return (
        <Flex
            flexDirection={"column"}
            w={"950px"}
            justifyContent={"center"}
            alignItems={"center"}
            p={5}
        >
            <Text fontSize="2xl" mb={5}>
                Create an Account
            </Text>
            <Divider mb={5} w={"50%"} />
            <Flex flexDirection={"column"} mb={5}>
                <Input
                    variant="filled"
                    placeholder="Full Name"
                    mb={3}
                    w={300}
                />
                <Input
                    variant="filled"
                    placeholder="Email"
                    type="email"
                    mb={3}
                    w={300}
                />
                <Input
                    variant="filled"
                    placeholder="Password"
                    type="password"
                    mb={3}
                    w={300}
                />
                <Button colorScheme="blue" mb={3}>
                    Sign Up
                </Button>
            </Flex>
            <Divider w={"50%"} />
            <Text mt={4} fontSize="sm">
                Already have an account?{" "}
                <Text as="span" color="blue.500" cursor="pointer">
                    Log in here
                </Text>
            </Text>
        </Flex>
    );
}

export default Signup;
