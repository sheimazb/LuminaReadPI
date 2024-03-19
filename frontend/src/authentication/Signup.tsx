import { useState } from "react";
import { Flex, Input, Button, Text, Divider,useToast, FormLabel, FormControl } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
    const toast =useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                formData
            );
          
            console.log("Response:", response.data);
    
            if (response.status === 201) {
                toast({
                    title: "Account created.",
                    description: "Successfully signed up!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/Auth/login");
            } else {
                toast({
                    title: "Error signing up!",
                    description: "Failed to sign up!",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error:any) {
            console.error("Error:", error.response);
            if (error.response.status === 400) {
                // Handle validation errors
                const errorMessage = error.response.data.error;
                toast({
                    title: "Error signing up!",
                    description: errorMessage,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Handle other types of errors
                toast({
                    title: "Error signing up!",
                    description: "An unexpected error occurred. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
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
            <Text fontSize="2xl">Create an Account</Text>
            <Divider my={8} w={300} />

            <form onSubmit={handleSubmit}>
                <Flex flexDirection={"column"} mb={5}>
                <FormControl mb='5' >
                    <FormLabel color={"purple.100"}>Full Name</FormLabel>
                    <Input
                        variant="filled"
                        placeholder="Full Name"
                        w={300}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    </FormControl>
                    <FormControl mb='5' >
                    <FormLabel color={"purple.100"}>Email</FormLabel>
                    <Input
                        variant="filled"
                        placeholder="Email"
                        type="email"
                        w={300}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    </FormControl>
                    <FormControl mb='5' >
                    <FormLabel color={"purple.100"}>Password</FormLabel>
                    <Input
                        variant="filled"
                        placeholder="Password"
                        type="password"
                        w={300}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" mb={3}>
                        Sign Up
                    </Button>
                </Flex>
            </form>

            <Text mt={4} fontSize="sm">
                Already have an account?
                <NavLink to="/Auth/login">
                    <Text as="span" color="blue.500" cursor="pointer" ml={1}>
                        Log in here
                    </Text>
                </NavLink>
            </Text>
        </Flex>
    );
}

export default Signup;
