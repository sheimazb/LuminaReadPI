import { ChakraProvider, extendTheme, useColorMode } from "@chakra-ui/react";
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
                <AppContent />
            </BrowserRouter>
        </ChakraProvider>
    );
}

function AppContent() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Navbar toggleColorMode={toggleColorMode} colorMode={colorMode} />
            <Routing />
        </>
    );
}

export default App;
