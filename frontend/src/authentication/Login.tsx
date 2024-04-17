import { Flex, Input, Button, Text, Divider, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "../stores/user";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { login } = useUserStore();
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [loginResponse, setLoginResponse] = useState<any>(null);

const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
        await login(formData);
        setLoginResponse(201);
        if (loginResponse === 201) {
            toast({
                title: "Success",
                description: "Logged in successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/marketplace");
        }else{
            toast({
                title: "Error",
                description: "Logged in failed! check your data! ",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    } catch (error: any) {
        console.error("Error logging in:", error);
        setLoginResponse(null); // Réinitialiser la réponse en cas d'erreur
        if (error.response && error.response.data.message) {
            toast({
                title: "Error",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error",
                description: "Failed to log in. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    } finally {
        setLoading(false);
    }
};




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
            <form onSubmit={handleSubmit}>
                <FormControl mb='5' isRequired>
                    <FormLabel color={"purple.100"}>Email</FormLabel>

                    <Input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter your email address'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl mb='5' isRequired>
                    <FormLabel color={"purple.100"}>Password</FormLabel>

                    <Input
                        variant="filled"
                        id='password'
                        placeholder='Enter your password'
                        type="password"
                        mb={6}
                        w={300}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                 
                </FormControl>
                <Button
                    color={"var(--chakra-colors-chakra-body-text)"}
                    bg={"var(--maincolor)"}
                    _hover={{
                        bg: "var(--hover-maincolor)",
                        color: "var(--chakra-colors-chakra-body-text)",
                    }}
                    mt={5}
                    w={"100%"}
                    type='submit'
                    isLoading={loading}
                    loadingText='Loging in...'
                >
                    Login
                </Button>
            </form>
            <Divider w={"50%"} />
            <Text mt={4} fontSize="sm">
                Don't have an account?
                <NavLink to="/Auth/signup">
                    <Text as="span" color="blue.500" cursor="pointer" ml={1}>
                        Sign up now
                    </Text>
                </NavLink>
            </Text>
        </Flex>
    );
}

export default Login;
