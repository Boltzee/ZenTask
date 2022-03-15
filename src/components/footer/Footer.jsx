import React from "react";
import { Container, Row } from "react-bootstrap";
import Style from "./Footer.module.css";

function Footer() {
    return (
        <>
            <Container fluid={true}>
                <Row className={Style.footer_row}>
                    <div className="col-7">
                        2021-2022 &copy; Course Pro Private Limited
                    </div>
                    <div className="col-5">
                        <div className={Style.terms}>
                            <div>Terms &amp; Conditions</div>
                            <div>Privacy Policy</div>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default Footer;
