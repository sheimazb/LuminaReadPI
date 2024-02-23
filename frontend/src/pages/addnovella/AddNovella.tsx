import React from 'react';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Select, Heading, Image, CardBody, Stack, Text, Button, Wrap, Card, Flex, Input } from '@chakra-ui/react';
import {useRef , useState} from "react" ;

const AddNovella = () => {
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
    <Box
      className="container"
      w="600px"
      margin="3rem auto"
      bgImage="url('https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/648851a9881c2a703afc9b15_bg-card-postBorderBig_tablet.webp')"
      bgPosition="0 0"
      bgRepeat="no-repeat"
      bgSize="100% 100%"
      flexDirection="column"
      justifyContent="flex-end"
      padding="3rem"
      display="flex"
    >
        <Tabs>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Wrap w={"100%"} p={2}>
                <Card
                  bg={"transparent"}
                  border={"var(--bordercolor) solid 1px "}
                  p={0}
                >
                  <CardBody>
                  <Box 
  w="600px"
      onClick={handleImageClick}>
          {image ? (
              <Image
                  src={image}
                  alt="Selected Image"
                  className="post-big-border__video is-success anim"
                  loading="lazy"
                  data-submit-anim=""
                  objectFit='cover'
                  borderRadius="lg"
                  w={"100%"}
                  h="140px"
              />
          ) : (
                  <Image
                  borderRadius='full'
                  boxSize='150px'
                  objectFit='cover'
                  src="https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1.jpg"
                  className="post-big-border__video is-success anim"

              />
             
          )}
          <input 
           type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} 
           ></input>
      </Box>  
                  
                    <Stack mt="3" spacing="1">
                    <Input placeholder='place the title of the novel'  htmlSize={500} width='20rem' height='30px' />
                      <Input mt={2} placeholder='place a description of the novel'  htmlSize={500} width='20rem' height='60px' />
                      <Select placeholder='' mt={2}>
  <option value='option1'>write </option>
  <option value='option2'>Upload</option>
</Select>
                      <Button  mt={2} size={"sm"}>
                        next 
                      </Button>
                    </Stack>
                  </CardBody>
                </Card>
              </Wrap>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
    </Box>
  );
};

export default AddNovella;
