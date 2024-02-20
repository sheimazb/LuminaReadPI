import React, { useState, useEffect } from 'react';
import { Flex, Input, Button, Text, Divider } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        console.log('Signup component mounted');
    }, []); // Le tableau vide en tant que deuxième argument signifie que useEffect s'exécutera uniquement lors du montage initial

    const handleChange = (e:any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register', formData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
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

            <Flex flexDirection={"column"} mb={5}>
                <form onSubmit={handleSubmit}>
                    <Input
                        variant="filled"
                        placeholder="Full Name"
                        mb={3}
                        w={300}
                        name="name" value={formData.name} onChange={handleChange}
                    />
                    <Input
                        variant="filled"
                        placeholder="Email"
                        type="email"
                        mb={3}
                        w={300}
                        name="email" value={formData.email} onChange={handleChange}
                    />
                    <Input
                        variant="filled"
                        placeholder="Password"
                        type="password"
                        mb={6}
                        w={300}
                        name="password" value={formData.password} onChange={handleChange}
                    />
                    <Button type="submit" colorScheme="blue" mb={3}>
                        Sign Up
                    </Button>
                </form>
            </Flex>

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
