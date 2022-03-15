import React from "react";
import { Container, Row } from "react-bootstrap";
import Not_found_svg from "./Not_found_svg_1.svg";
import Style from "./Not_found.module.css";

const Not_found = () => {
    return (
        <>
            <Container fluid className={Style.no_user_cont}>
                <Row className={Style.no_user_row}>
                    <div className={`col-sm-4 ${Style.no_user_div}`}>
                        <h6 className="display-5 mb-4">
                            Page
                            <br /> Not{" "}
                            <span style={{ color: "#01CB63" }}>Found</span>
                        </h6>
                        <a
                            href="/"
                            type="button"
                            className="btn btn-dark btn-rounded mb-4"
                        >
                            Back to Home
                        </a>
                    </div>
                    <div className={`col-sm-8 ${Style.svg_img2}`}>
                        <img src={Not_found_svg} width="90%" alt="" />
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Not_found;
