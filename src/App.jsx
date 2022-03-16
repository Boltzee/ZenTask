import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Homepage from "./components/Homepage/Homepage";
import Not_found from "./components/not_found/Not_found";
import "./App.css";

function App() {
    return (
        <div className="container-fluid p-0">
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="*" element={<Not_found />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
