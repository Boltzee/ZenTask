import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Homepage from "./components/Homepage/Homepage";
import Not_found from "./components/not_found/Not_found";
import "./App.css";
import dark_mode_img from "./assets/dark_mode.svg";
import light_mode_img from "./assets/light_mode.svg";
import { Toast, ToastContainer } from "react-bootstrap";
import Preloader from "./components/Preloader/Preloader";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        const temp = Array.from(toasts);
        temp.push(toast);
        setToasts(temp);
    };

    const toggleDarkMode = (v) => {
        setDarkMode(v);
    };

    const setToastShow = (bool, index) => {
        const temp = Array.from(toasts);
        temp[index].show = bool;
        setToasts(temp);
    };

    useEffect(() => {
        setTimeout(() => {
            document.querySelector(".loader_cont").style.display = "none";
        }, 4000);
    }, []);

    return (
        <div className="container-fluid p-0">
            <Preloader />
            <Router>
                <NavBar darkMode={darkMode} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Homepage
                                darkMode={darkMode}
                                toggleDarkMode={toggleDarkMode}
                                addToast={addToast}
                            />
                        }
                    />
                    <Route path="*" element={<Not_found />} />
                </Routes>
            </Router>
            <div
                className="darkMode_toggler"
                onClick={() => {
                    setDarkMode(!darkMode);
                }}
            >
                <img
                    src={darkMode ? light_mode_img : dark_mode_img}
                    className="darkMode_image"
                    alt=""
                />
            </div>
            <ToastContainer>
                {toasts.map((toast, index) => (
                    <Toast
                        onClose={() => setToastShow(false, index)}
                        show={toast.show}
                        delay={8000}
                        autohide
                        className={
                            toast.type
                                ? darkMode
                                    ? ""
                                    : "bg-dark"
                                : "bg-danger"
                        }
                    >
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Notes Pro</strong>
                            <small>Just now</small>
                        </Toast.Header>
                        <Toast.Body
                            style={{
                                color: toast.type
                                    ? darkMode
                                        ? "#333"
                                        : "white"
                                    : "white",
                            }}
                        >
                            {toast.message}
                        </Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </div>
    );
}

export default App;
