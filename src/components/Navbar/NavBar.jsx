import React from "react";
import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";

function NavBar({ darkMode }) {
    return (
        <Navbar id="main_navbar" fixed="top">
            <Navbar.Brand
                href="/"
                className={`brand ${darkMode ? "text-white" : "text-dark"}`}
            >
                Notes Pro
            </Navbar.Brand>
        </Navbar>
    );
}

export default NavBar;
