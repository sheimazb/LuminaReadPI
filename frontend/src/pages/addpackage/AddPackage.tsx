import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Image,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Select
} from "@chakra-ui/react";
import axios from "axios";

const AddPackage: React.FC = () => {
    const toast = useToast();
    const [token, setToken] = useState("");

  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };



  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    img: File | null;
    langue: string;
    price: string;
  }>({
    title: "",
    description: "",
    category: "",
    img: null,
    langue: "",
    price: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setFormData({
            ...formData,
            img: file,
        });
    }
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("langue", formData.langue);
      formDataToSend.append("price", formData.price);
      if (formData.img) {
        formDataToSend.append("image", formData.img);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/add-pack",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Success",
        description: "Added pack successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
    });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Flex marginTop="4rem" justifyContent="space-evenly">
      <Box
        className="container"
        w="600px"
        h="520px"
        bgImage="url('https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/648851a9881c2a703afc9b15_bg-card-postBorderBig_tablet.webp')"
        bgPosition="0 0"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        flexDirection="column"
        justifyContent="flex-end"
        padding="3rem"
        display="flex"
      >
        <form onSubmit={handleSubmit}>
          <Flex className="containerr" flexDirection="column">
            <FormControl isRequired>
              <FormLabel marginTop="-10rem">Place the title of package :</FormLabel>
              <Input
                onChange={handleChange}
                name="title"
                value={formData.title}
                placeholder="First name"
              />
            </FormControl>
            <Flex className="content" w="100%" paddingTop={1} justifyContent="space-between">
              <Flex marginTop="-4rem" onClick={handleImageClick}>
                {image ? (
                  <Image
                    src={image}
                    alt="Selected Image"
                    className="post-big-border__video is-success anim"
                    loading="lazy"
                    data-submit-anim=""
                    boxSize="180px"
                    height={"140px"}
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    boxSize="180px"
                    objectFit="cover"
                    src="https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1.jpg"
                    className="post-big-border__video is-success anim"
                  />
                )}
                <input
                  type="file"
                  name="image"
                  ref={inputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </Flex>
              <Input
                marginTop="-4rem"
                onChange={handleChange}
                name="description"
                value={formData.description}
                placeholder="put your description here !"
                w="300px"
                h="180px"
              />
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"450px"}
              p={1}
              rounded={10}
              marginTop="1rem"
            >
              <FormControl isRequired>
                <Input
                  placeholder="price "
                  w={"140px"}
                  color="cyan.200"
                  display={"flex"}
                  alignItems={"center"}
                  gap={1} 
                  marginRight="15px"
                  onChange={handleChange}
                  name="price"
                  value={formData.price}
                />
              </FormControl>
              <FormControl isRequired>
              <Input  
               w={"150px"}
                    placeholder="Langue"
                    onChange={handleChange}
                    marginRight="15px"
                    name="langue"
                    value={formData.langue}
                /></FormControl>
                <FormControl isRequired>
                <Input  w={"150px"}
                    placeholder="Category"
                    marginRight="15px"
                    onChange={handleChange}
                    name="category"
                    value={formData.category}
                /></FormControl>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"450px"}
              p={1}
              rounded={10}
              marginTop="1rem"
            >
              <Select placeholder="Select" w={"180px"}>
                <option value="option1">Kids</option>
                <option value="option2">IT</option>
                <option value="option3">Developpement</option>
              </Select>
              <Button  type="submit" marginRight="-4rem" w={"220px"} colorScheme="cyan" >
                Add Now
              </Button>
            </Flex>
          </Flex>
        </form>
      </Box>
      <Box
        className="container"
        w="500px"
        h="450px"
        bgImage="url('https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/6488858e9c6ab83eafdbd7a7_bg-card-postBig2_tablet.webp')"
        bgPosition="0 0"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        flexDirection="column"
        justifyContent="flex-end"
        padding="3rem"
        display="flex"
      >
        <Flex className="containerr" flexDirection="column">
          <FormLabel marginTop="-20rem" size="xs">
            Description of a package :
          </FormLabel>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias voluptates dolorem esse
            velit praesentium id fuga necessitatibus adipisci earum? Dignissimos harum praesentium
            nisi totam! Itaque at libero esse recusandae possimus.
          </p>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AddPackage;

