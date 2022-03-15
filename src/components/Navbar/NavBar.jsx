import React from "react";
import Style from "./Navbar.module.css";
import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";
import brand from "./Brand_icon.svg";

function NavBar() {
    return (
        <Navbar
            id="main_navbar"
            sticky="top"
            className={`${Style.main_navbar}`}
        >
            <Navbar.Brand href="/">
                <img src={brand} className="_logo" />
            </Navbar.Brand>
            <Nav
                className="n"
                style={{
                    alignItems: `center`,
                    width: `100%`,
                    paddingRight: `4.5rem`,
                }}
                id="nav-cont"
            >
                <Nav.Link href="#" className={`${Style.n2}`} id="left">
                    Login
                </Nav.Link>

                <Nav.Link href="#" className={`${Style.n2}`} id="right">
                    <i>Register</i>
                </Nav.Link>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
    );
}

export default NavBar;
