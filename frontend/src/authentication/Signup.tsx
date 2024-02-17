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
            <Text fontSize="2xl">Create an Account</Text>
            <Divider my={8} w={300} />
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
                    mb={6}
                    w={300}
                />
                <Button colorScheme="blue" mb={3}>
                    Sign Up
                </Button>
            </Flex>
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
