import { Flex, Input, Button, Text, Divider,
    useToast,
    FormControl,
    FormLabel,

} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { useUserStore } from "../stores/user";
function Login() {
   const [formData, setFormData] =useState({
    email: "",
    password: "",
   });
   const[loading,setLoading] = useState(false);
   const toast =useToast();
   const {login}=useUserStore();
   const handleChange =(e:any)=>{
    const {name,value} = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
   };

   const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      await login(formData);

      toast({
        title: "Success",
        description: "Logged in successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      redirect("/marketplace");
    } catch (error: any) {
      console.error("Error logging in:", error);

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
    }
    setLoading(false);
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
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
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
