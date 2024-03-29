import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Marketplace from "./pages/marketpalce/Marketplace";
import Package from "./pages/package/Package";
import Novella from "./pages/novella/Novella";
import TTS from "./pages/novella/TTS-page";
import {Auth} from "./authentication/Auth";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import Forum from "./pages/novella/Forum";
import Profile from "./pages/profile/Profile";
import TextReader from "./pages/TextReaderSection/TextReader";
import AddPackage from "./pages/addpackage/AddPackage";
import AddNovella from "./pages/addnovella/AddNovella";
import NovellaContent from "./pages/novella/NovellaContent";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/package/:id" element={<Package />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/TextReader/:id" element={<TextReader />} />
            <Route path="/AddNovella/:pack_id" element={<AddNovella />} />
            <Route path="/AddPackage" element={<AddPackage />} />
            <Route path="/novella/:id/*" element={<Novella />}>
                <Route path="" element={<Navigate to="forum" />} />
                <Route path="read" element={<NovellaContent />} />
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
