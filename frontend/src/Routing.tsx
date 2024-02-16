import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Marketplace from "./pages/marketpalce/Marketplace";
import Package from "./pages/package/Package";
import Novella from "./pages/novella/Novella";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/package" element={<Package />} />
            <Route path="/novella" element={<Novella />} />
        </Routes>
    );
}

export default App;
