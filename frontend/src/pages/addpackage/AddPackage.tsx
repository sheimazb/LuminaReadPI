import {
    Box,
    Flex,
    Text,
    Image,
    Button,
    Wrap,
    Input,
    InputGroup,
    InputRightElement,
    ButtonGroup,
    CardFooter,
    Stack,
    CardBody,
    Heading,
    Card,
    FormControl,
    FormLabel,
    Select 

} from "@chakra-ui/react";
import {useRef , useState} from "react" ;

import React from 'react';

const AddPackage: React.FC = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };
  return (
    <Flex
    marginTop="4rem"
    justifyContent="space-evenly"
    >
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
    <Flex className="containerr"
     flexDirection="column"
     >
    <FormControl isRequired
     >
<FormLabel 
marginTop="-10rem"
 >Place the title  of package :</FormLabel>
<Input placeholder='First name'/>
</FormControl>
      <Flex className="content" w="100%" paddingTop={1} justifyContent="space-between"
       >
    
      <Flex 
marginTop="-4rem"

      onClick={handleImageClick}>
          {image ? (
              <Image
                  src={image}
                  alt="Selected Image"
                  className="post-big-border__video is-success anim"
                  loading="lazy"
                  data-submit-anim=""
                  boxSize='180px'
                  height={"140px"}
                  objectFit='cover'
              />
          ) : (
                  <Image
                  boxSize='180px'
                  objectFit='cover'
                  src="https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1.jpg"
                  className="post-big-border__video is-success anim"

              />
             
          )}
          <input 
           type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} 
           ></input>
      </Flex>  
    <Input 
        marginTop="-4rem"

    placeholder='put your description here !' w="300px" h="180px" />

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
                                  <Input placeholder='place price here '
                                  w={"180px"}
                                  color="cyan.200"
                                  display={"flex"}
                                  alignItems={"center"}
                                  gap={1}
                                  />
                                  </FormControl>
                                  

                                  <Select placeholder='Select language'
                                      marginRight={"-4rem"}

                                       >
                                  <option value='option1'>Anglais</option>
                                  <option value='option2'>Arabe</option>
                                  <option value='option3'>Francais</option>
                                </Select>

                               
                                  
                                    
                              </Flex>
                              <Flex
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                  w={"450px"}
                                  p={1}
                                  rounded={10}
                                  marginTop="1rem"
                              >
                              <Select placeholder='Select'
                                  w={"180px"}
                                  >
                                  <option value='option1'>Kids</option>
                                  <option value='option2'>IT</option>
                                  <option value='option3'>Developpement</option>
                                </Select>

                              <Button
                                      marginRight={"-4rem"}
                                       w={"220px"}
                                        colorScheme="cyan">
                                          Add Now
                                      </Button>
                                      </Flex>
     
    </Flex>
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
    <Flex className="containerr"
     flexDirection="column"
     >
    
<FormLabel 
marginTop="-20rem"
size="xs"
 >Description of a package  : </FormLabel>
 <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias voluptates dolorem esse velit praesentium id fuga necessitatibus adipisci earum? Dignissimos harum praesentium nisi totam! Itaque at libero esse recusandae possimus.
 </p>
     
    </Flex>
  </Box>
  </Flex>
  );
};

export default AddPackage;
