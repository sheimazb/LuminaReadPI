import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Marketplace from "./pages/marketpalce/Marketplace";
import Package from "./pages/package/Package";
import Novella from "./pages/novella/Novella";
import TTS from "./pages/novella/TTS-page";
import Auth from "./authentication/Auth";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/package" element={<Package />} />
            <Route path="/novella" element={<Novella />} />
            <Route path="/TTS" element={<TTS />} />
            <Route path="/Auth/*" element={<Auth />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>
        </Routes>
    );
}

export default App;
