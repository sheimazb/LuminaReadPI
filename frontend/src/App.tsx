import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

const theme = extendTheme({
    config: {
        useSystemColorMode: false,
        initialColorMode: "dark",
    },
    styles: {
        global: {},
    },
    colorScheme: "dark",
});

function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Navbar />
                <Routing />
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
