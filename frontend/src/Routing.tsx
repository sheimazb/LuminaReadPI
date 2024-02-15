import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Marketplace from "./pages/marketpalce/Marketplace";
import Package from "./pages/package/Package";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/package" element={<Package />} />
        </Routes>
    );
}

export default App;
