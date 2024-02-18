import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Marketplace from "./pages/marketpalce/Marketplace";
import Package from "./pages/package/Package";
import Novella from "./pages/novella/Novella";
import TTS from "./pages/novella/TTS-page";
import Auth from "./authentication/Auth";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import Forum from "./pages/novella/Forum";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/package" element={<Package />} />
            <Route path="/novella/*" element={<Novella />}>
                <Route path="" element={<Navigate to="forum" />} />
                <Route path="TTS" element={<TTS />} />
                <Route path="forum" element={<Forum />} />
            </Route>
            <Route path="/Auth/*" element={<Auth />}>
                <Route path="" element={<Navigate to="signup" />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    );
}

export default App;
