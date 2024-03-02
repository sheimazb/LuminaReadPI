import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Wrap,
  FormControl,
  FormLabel,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";

const AddNovella: React.FC = () => {
    const [token, setToken] = useState<string>("");
    const toast = useToast();
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        img: File | null;
        content: string;
        progress: string;
      }>({
        title: "",
        description: "",
        img: null,
        content: "",
        progress: "",
      });

      
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const imageInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>("");
  
 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleImageClick = () => {
    imageInputRef.current?.click();
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
      const url = window.location.href;
      const packId = url.split("/").pop();

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("progress", formData.progress);
      if (formData.img) {
        formDataToSend.append("image", formData.img);
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/add-novella/${packId}`, // Inject pack ID into the URL
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
        description: "Added novella successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
    });
    console.log("Response:", response.data);
} catch (error:any) {
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
            description: "Failed add novella. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }
    console.error("Error:", error);
}
};

  return (
    <>
      <Button onClick={onOpen}>Add Book</Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Wrap w={"100%"} p={2}>
              <form onSubmit={handleSubmit}>
                <Box w="550px" onClick={handleImageClick}>
                  {image ? (
                    <Image
                      borderRadius="full"
                      boxSize="150px"
                      objectFit="cover"
                      src={image}
                      alt="Selected Image"
                      className="post-big-border__video is-success anim"
                      loading="lazy"
                      data-submit-anim=""
                    />
                  ) : (
                    <Image
                      borderRadius="full"
                      boxSize="150px"
                      objectFit="cover"
                      src="https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1.jpg"
                      className="post-big-border__video is-success anim"
                    />
                  )}
                  <input
                    type="file"
                    name="image"
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </Box>
                <FormControl>
                  <Input
                    w="sm"
                    mt="2"
                    onChange={handleChange}
                    ref={initialRef}
                    name="title" // Corrected name attribute
                    value={formData.title}
                    placeholder="Place the title of the novel"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    w="sm"
                    mt="2"
                    onChange={handleChange}
                    name="description" // Corrected name attribute
                    value={formData.description}
                    placeholder="Place the description of the novel"
                  />
                </FormControl>
                <Input
                  w="sm"
                  mt="2"
                  placeholder="Langue"
                  onChange={handleChange}
                  name="content"
                  value={formData.content}
                />
                <Input
                  w="sm"
                  mt="2"
                  placeholder="Price"
                  onChange={handleChange}
                  name="progress"
                  value={formData.progress}
                />
                <Textarea w="sm" placeholder="Enter text to speak..." mt={2} height={100} />
              </form>
            </Wrap>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNovella;
