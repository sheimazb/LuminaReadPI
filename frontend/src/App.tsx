import { Box, ChakraProvider, useColorMode } from "@chakra-ui/react";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Box position="fixed" w="100%" zIndex="99" >
                    <Navbar />
                </Box>
                <Routing />{" "}
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
