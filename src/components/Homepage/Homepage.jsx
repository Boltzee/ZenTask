import React, { useState, useEffect } from "react";
import db from "../../firebase";
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    doc,
} from "firebase/firestore";
import { Container, Row, Modal } from "react-bootstrap";
import { gsap } from "gsap";
import ReactFullpage from "@fullpage/react-fullpage";
import "./Homepage.css";
import Style from "./Homepage.module.css";
import Picture1 from "./Picture1.png";
import Right_svg from "./right_arrow.svg";
import Right_svg_light from "./right_arrow_light.svg";
import Pin from "./pin.svg";
import Pin_dark from "./pin_dark.svg";
import Unpin from "./unpin.svg";
import Unpin_dark from "./unpin_dark.svg";

function Homepage({ darkMode, toggleDarkMode, addToast }) {
    const [notes, setNotes] = useState([]);
    const [show9, setShow9] = useState(false);
    const handleClose9 = () => setShow9(false);
    const handleShow9 = () => setShow9(true);

    const [show8, setShow8] = useState(false);
    const handleClose8 = () => setShow8(false);
    const handleShow8 = () => setShow8(true);

    const [newTitle, setNewTitle] = useState();
    const [newTag, setNewTag] = useState();
    const [newDesc, setNewDesc] = useState();

    const [selectedItem, setSelectedItem] = useState("");
    const [slider_ar, set_arr] = useState([]);

    const selectedItemHandler = (note) => {
        setNewTitle(note.data().title);
        setNewTag(note.data().tagline);
        setNewDesc(note.data().description);
        setSelectedItem(note);
    };

    const createNote = async () => {
        if (newTitle || newTag || newDesc) {
            const ref = await addDoc(collection(db, "notes"), {
                title: newTitle || "No Title",
                tagline: newTag || "No Tagline",
                description: newDesc || "",
                pinned: false,
            });
            setNewTitle("");
            setNewTag("");
            setNewDesc("");
            if (ref.id) {
                const temp = {
                    show: true,
                    message: "Note has been successfully created",
                    type: true,
                };
                addToast(temp);
            } else {
                const temp = {
                    show: true,
                    message: "Error while creating note",
                    type: false,
                };
                addToast(temp);
            }
        } else {
            const temp = {
                show: true,
                message: "Atleast One of the fields must be filled",
                type: false,
            };
            addToast(temp);
        }
    };

    const deleteNote = async (note) => {
        await deleteDoc(doc(db, "notes", note.id)).then(
            () => {
                const temp = {
                    show: true,
                    message: "Note has been successfully deleted",
                    type: true,
                };
                addToast(temp);
            },
            (err) => {
                const temp = {
                    show: true,
                    message: "Error while deleting the note. Please try again",
                    type: false,
                };
                addToast(temp);
            }
        );
    };

    const editNote = async () => {
        const docRef = doc(db, "notes", selectedItem.id);
        const docSnap = await getDoc(docRef);
        if (
            newTitle != docSnap.data().title ||
            newTag != docSnap.data().tagline ||
            newDesc != docSnap.data().description
        ) {
            if (docSnap.exists()) {
                await updateDoc(docRef, {
                    title: newTitle || docSnap.data().title,
                    tagline: newTag || docSnap.data().tagline,
                    description: newDesc || docSnap.data().description,
                });
                setNewTitle("");
                setNewTag("");
                setNewDesc("");
                const temp = {
                    show: true,
                    message: "Note has been successfully edited",
                    type: true,
                };
                addToast(temp);
            } else {
                console.log("No such document!");
                const temp = {
                    show: true,
                    message: "No such note exists. Please try again",
                    type: false,
                };
                addToast(temp);
            }
        } else {
            const temp = {
                show: true,
                message: "Please change atleast one field to edit",
                type: false,
            };
            addToast(temp);
        }
    };

    const togglePinned = async (note) => {
        const docRef = doc(db, "notes", note.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                pinned: !docSnap.data().pinned,
            });
        } else {
            console.log("No such document!");
            const temp = {
                show: true,
                message: "No such note exists",
                type: false,
            };
            addToast(temp);
        }
    };

    const onLeave = (origin, destination, direction) => {
        const section = destination.item;

        if (destination.index == 0) {
            document.querySelector(".brand").style.paddingTop = "2rem";
        } else {
            document.querySelector(".brand").style.paddingTop = "0rem";
        }
    };

    // const afterLoad = (origin, destination, direction) => {
    //     console.log("After load: " + destination.index);
    // };

    useEffect(async () => {
        onSnapshot(collection(db, "notes"), (snapshot) => {
            setNotes(
                snapshot.docs.sort(function (a, b) {
                    return b.data().pinned - a.data().pinned;
                })
            );
            let slider_arr = [];
            let temp = [];
            snapshot.docs.forEach((a, index) => {
                if (index != 0 && index % 6 == 0) {
                    slider_arr.push(temp);
                    temp = [];
                    temp.push(index);
                } else {
                    temp.push(index);
                }
            });
            slider_arr.push(temp);
            // console.log(slider_arr);
            set_arr(slider_arr);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            document.querySelector(".darkMode_toggler").click();
        }, 3000);
        const section_1_s = document.querySelector(".section_1_s");
        const header_col = document.querySelector(".header_col_s");
        const img_col = document.querySelector(".image_col_s");
        const tl = gsap.timeline({ delay: 3.5 });
        tl.fromTo(
            section_1_s,
            { y: "150vh", opacity: 0.4 },
            { y: "0vh", opacity: 1, duration: 1.5 }
        )
            .fromTo(
                img_col,
                { x: "50vw", opacity: 0 },
                { x: "0vw", opacity: 1, duration: 0.9 },
                "-=0.4"
            )
            .fromTo(
                header_col,
                { x: "-20vw", opacity: 0 },
                { x: "0vw", opacity: 1, duration: 1.2 },
                "-=0.8"
            );
    }, []);

    useEffect(() => {
        const t = document.querySelectorAll(
            "#fp-nav ul li a span.fp-sr-only + span"
        );
        const u = document.querySelectorAll(
            ".fp-slidesNav ul li a span.fp-sr-only + span"
        );
        const i = document.querySelector(".fp-slidesNav ul");
        const scrollBar = document.querySelector(
            ".scroll-down-arrow.smooth-scroll-down.about-btn"
        );
        if (scrollBar) {
            scrollBar.style.border = darkMode
                ? `2px solid #ffffff`
                : `2px solid #333`;
        }
        // const k = (document.querySelector(
        //     ".fp-slidesNav.fp-bottom"
        // ).style.bottom = "11px");

        const temp = document.querySelector(".fp-controlArrow.fp-prev");
        const temp1 = document.querySelector(".fp-controlArrow.fp-next");
        if (temp) {
            temp.style.backgroundImage = darkMode
                ? `url(${Right_svg_light})`
                : `url(${Right_svg})`;
        }
        if (temp1) {
            temp1.style.backgroundImage = darkMode
                ? `url(${Right_svg_light})`
                : `url(${Right_svg})`;
        }
        if (t) {
            t.forEach((node) => {
                node.style.background = darkMode ? "white" : "#333";
            });
        }
        if (u) {
            u.forEach((node) => {
                node.style.background = darkMode ? "white" : "#333";
            });
        }
        if (i) {
            i.style.display = "flex";
            i.style.justifyContent = "center";
            i.style.alignItems = "center";
        }
    }, [darkMode]);

    return (
        <>
            <ReactFullpage
                scrollOverflow={true}
                scrollHorizontally={true}
                slidesNavigation={true}
                navigation={true}
                sectionsColor={
                    darkMode ? ["#202124", "#202124"] : ["White", "White"]
                }
                onLeave={onLeave}
                render={({ state, fullpageApi }) => {
                    return (
                        <div>
                            <div id="fullpage-wrapper">
                                <div className={`section section_1_s`}>
                                    <Container
                                        fluid={true}
                                        className={`${Style.landing_cont}`}
                                    >
                                        <Row className={`${Style.landing_row}`}>
                                            <div
                                                className={`col-lg-5 col-md-6 header_col_s ${Style.header_col}`}
                                            >
                                                <div
                                                    className={`${
                                                        darkMode
                                                            ? "text-white"
                                                            : "text-dark"
                                                    } ${Style.header_group}`}
                                                >
                                                    <h1
                                                        className={`${Style.headers}`}
                                                    >
                                                        All your notes.
                                                    </h1>
                                                    <h1
                                                        className={`${Style.headers}`}
                                                    >
                                                        Organised.
                                                    </h1>
                                                    <h1
                                                        className={`${Style.headers}`}
                                                    >
                                                        Effortlessly.
                                                    </h1>
                                                </div>
                                                <div
                                                    className={`${
                                                        darkMode
                                                            ? Style.off_white
                                                            : "text-dark"
                                                    } ${Style.header_para}`}
                                                >
                                                    Inspiration strikes
                                                    anywhere. Notes Pro lets you
                                                    capture, organise, and Share
                                                    your ideas across any
                                                    device.
                                                </div>
                                                <a
                                                    href="#"
                                                    className={`btn btn-rounded ${
                                                        darkMode
                                                            ? "btn-light"
                                                            : "btn-dark"
                                                    } ${Style.get_started}`}
                                                    style={
                                                        darkMode
                                                            ? {
                                                                  fontWeight:
                                                                      "600",
                                                              }
                                                            : {
                                                                  fontWeight:
                                                                      "500",
                                                              }
                                                    }
                                                >
                                                    Get Started
                                                </a>
                                                <div
                                                    style={{
                                                        width: "10%",
                                                        border: "1px solid",
                                                        borderColor: darkMode
                                                            ? "rgba(255, 255, 255, 0.8)"
                                                            : "rgba(33,37,41,1)",
                                                        marginTop: "1.5rem",
                                                    }}
                                                ></div>
                                                <div
                                                    className={`mt-4 ${Style.quotation}`}
                                                    style={{
                                                        fontSize: "0.9rem",
                                                        color: darkMode
                                                            ? "rgba(255,255,255,0.9)"
                                                            : "rgba(33,37,41,1)",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    <q>
                                                        Note Pro is my secret
                                                        creative <br /> super
                                                        power
                                                    </q>
                                                </div>
                                                <div
                                                    className={`mt-3 ${Style.person_info}`}
                                                >
                                                    <img
                                                        src={Picture1}
                                                        className={Style.img}
                                                        alt="picture"
                                                    />
                                                    <div
                                                        className="ms-2"
                                                        style={{
                                                            fontSize: "0.75rem",
                                                        }}
                                                    >
                                                        <span
                                                            className={`${
                                                                darkMode
                                                                    ? "text-white"
                                                                    : "text-dark"
                                                            } ${Style.name}`}
                                                        >
                                                            Brenda Phillips
                                                        </span>
                                                        <br />
                                                        <span
                                                            className={`${
                                                                darkMode
                                                                    ? Style.off_white
                                                                    : "text-dark"
                                                            }`}
                                                        >
                                                            <i>
                                                                Design Director
                                                                &amp; Bloomberg
                                                            </i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="scroll-down-arrow smooth-scroll-down about-btn d-none d-lg-block"></div>
                                            </div>
                                            <div
                                                className={`col-lg-7 col-md-6 image_col_s ${Style.img_col}`}
                                            ></div>
                                        </Row>
                                    </Container>
                                </div>
                                <div className={`section section_2_s`}>
                                    <button
                                        type="button"
                                        className={`btn btn-rounded ${
                                            darkMode
                                                ? "btn-light"
                                                : "btn-success"
                                        } ${Style.create_new}`}
                                        style={
                                            darkMode
                                                ? {
                                                      fontWeight: "600",
                                                  }
                                                : {
                                                      fontWeight: "500",
                                                      backgroundColor:
                                                          "#01cb63",
                                                      border: "none",
                                                  }
                                        }
                                        onClick={() => {
                                            handleShow8();
                                        }}
                                    >
                                        <svg
                                            width="25"
                                            height="25"
                                            viewBox="0 0 404 404"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M202 0.402008C192.723 0.402008 185.199 7.92541 185.199 17.203V185.203H17.199C7.92171 185.203 0.397995 192.722 0.397995 202.004C0.397995 211.281 7.91751 218.805 17.199 218.805H185.199V386.805C185.199 396.082 192.722 403.606 202 403.606C211.278 403.606 218.801 396.083 218.801 386.805V218.805H386.801C396.078 218.805 403.602 211.282 403.602 202.004C403.602 192.726 396.083 185.203 386.801 185.203H218.801V17.203C218.801 7.92571 211.281 0.402008 202 0.402008V0.402008Z"
                                                fill={
                                                    darkMode ? "black" : "white"
                                                }
                                            />
                                        </svg>
                                        <span
                                            style={{
                                                marginLeft: "0.6rem",
                                                marginTop: "0.1rem",
                                            }}
                                        >
                                            Create
                                        </span>
                                    </button>
                                    <Container fluid={true}>
                                        <Row>
                                            <div
                                                className={`col-md-4 ${Style.img2_col}`}
                                            ></div>
                                            <div
                                                className={`col-md-8 ${Style.notes_col}`}
                                            >
                                                {slider_ar.map((arr, index) => (
                                                    <div
                                                        className="slide"
                                                        data-anchor={`slide${
                                                            index + 1
                                                        }`}
                                                        key={index}
                                                    >
                                                        <Container
                                                            className={`${Style.notes_cont}`}
                                                        >
                                                            <Row
                                                                className={`${Style.notes_row} gap-3`}
                                                            >
                                                                {arr.map(
                                                                    (
                                                                        i,
                                                                        index2
                                                                    ) => {
                                                                        return (
                                                                            notes[
                                                                                i
                                                                            ] && (
                                                                                <div
                                                                                    className={`col-sm-3 rounded-3 ${Style.note}`}
                                                                                    key={
                                                                                        index2
                                                                                    }
                                                                                    style={{
                                                                                        flex:
                                                                                            index2 ==
                                                                                            0
                                                                                                ? "auto"
                                                                                                : "",
                                                                                    }}
                                                                                    onClick={(
                                                                                        e
                                                                                    ) => {
                                                                                        selectedItemHandler(
                                                                                            notes[
                                                                                                i
                                                                                            ]
                                                                                        );
                                                                                        handleShow9();
                                                                                    }}
                                                                                >
                                                                                    <div
                                                                                        className={`${Style.pin_div}`}
                                                                                        onClick={(
                                                                                            e
                                                                                        ) => {
                                                                                            e.stopPropagation();
                                                                                            togglePinned(
                                                                                                notes[
                                                                                                    i
                                                                                                ]
                                                                                            );
                                                                                        }}
                                                                                        style={
                                                                                            notes[
                                                                                                i
                                                                                            ].data()
                                                                                                .pinned
                                                                                                ? darkMode
                                                                                                    ? {
                                                                                                          backgroundImage: `url(${Unpin})`,
                                                                                                      }
                                                                                                    : {
                                                                                                          backgroundImage: `url(${Unpin_dark})`,
                                                                                                      }
                                                                                                : darkMode
                                                                                                ? {
                                                                                                      backgroundImage: `url(${Pin})`,
                                                                                                  }
                                                                                                : {
                                                                                                      backgroundImage: `url(${Pin_dark})`,
                                                                                                  }
                                                                                        }
                                                                                    ></div>
                                                                                    <h5
                                                                                        className={`${
                                                                                            darkMode
                                                                                                ? "text-white"
                                                                                                : "text-dark"
                                                                                        }`}
                                                                                    >
                                                                                        {
                                                                                            notes[
                                                                                                i
                                                                                            ].data()
                                                                                                .title
                                                                                        }
                                                                                    </h5>
                                                                                    <p
                                                                                        style={{
                                                                                            fontSize:
                                                                                                "0.9rem",
                                                                                            color: darkMode
                                                                                                ? "rgba(255,255,255,0.9)"
                                                                                                : "rgba(33,37,41,1)",
                                                                                            fontWeight:
                                                                                                "bold",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            notes[
                                                                                                i
                                                                                            ].data()
                                                                                                .tagline
                                                                                        }
                                                                                    </p>
                                                                                    <p
                                                                                        style={{
                                                                                            fontSize:
                                                                                                "0.75rem",
                                                                                            color: darkMode
                                                                                                ? "rgba(255,255,255,0.8)"
                                                                                                : "rgba(33,37,41,1)",
                                                                                        }}
                                                                                    >
                                                                                        {notes[
                                                                                            i
                                                                                        ].data()
                                                                                            .description
                                                                                            .length >
                                                                                        350
                                                                                            ? notes[
                                                                                                  i
                                                                                              ]
                                                                                                  .data()
                                                                                                  .description.slice(
                                                                                                      0,
                                                                                                      350
                                                                                                  )
                                                                                            : notes[
                                                                                                  i
                                                                                              ].data()
                                                                                                  .description}
                                                                                    </p>
                                                                                    {/* <button
                                                            class="btn btn-primary btn-block mb-4 add_recipe_button"
                                                            
                                                        >
                                                            DELETE ITEM
                                                        </button> */}
                                                                                </div>
                                                                            )
                                                                        );
                                                                    }
                                                                )}
                                                            </Row>
                                                        </Container>
                                                    </div>
                                                ))}
                                            </div>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </div>
                    );
                }}
            />
            <Modal
                className={Style.model_dialog}
                show={show9}
                onHide={handleClose9}
            >
                <Modal.Body
                    style={{
                        backgroundColor: darkMode ? "#202124" : "white",
                    }}
                >
                    <form className={`${Style.edit_form}`}>
                        <div
                            className={`${Style.delete_btn}`}
                            onClick={() => {
                                deleteNote(selectedItem);
                                handleClose9();
                            }}
                        ></div>
                        <div class="form-outline">
                            <input
                                type="text"
                                id="form3Example1"
                                placeholder="Title"
                                value={newTitle}
                                className={`form-control ${Style.input_field} ${
                                    darkMode ? "text-white" : "text-dark"
                                } `}
                                style={{ fontSize: "1.375rem" }}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </div>

                        <div class="form-outline">
                            <input
                                type="text"
                                id="form3Example2"
                                placeholder="Tagline"
                                value={newTag}
                                className={`form-control ${Style.input_field} ${
                                    darkMode ? "text-white" : "text-dark"
                                } `}
                                style={{ fontSize: "1rem" }}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                        </div>

                        <div class="form-outline">
                            <textarea
                                type="text"
                                id="form3Example3"
                                placeholder="Note"
                                value={newDesc}
                                className={`form-control ${Style.input_field} ${
                                    darkMode ? "text-white" : "text-dark"
                                } `}
                                style={{ fontSize: "0.9rem" }}
                                onChange={(e) => setNewDesc(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className={`btn btn-rounded mt-3 rounded-circle ${
                                darkMode ? "btn-light" : "btn-success"
                            } ${Style.create_new_btn}`}
                            style={
                                darkMode
                                    ? {
                                          fontWeight: "600",
                                          alignSelf: "flex-end",
                                      }
                                    : {
                                          fontWeight: "500",
                                          backgroundColor: "#01cb63",
                                          border: "none",
                                          alignSelf: "flex-end",
                                      }
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                editNote(e, selectedItem);
                                handleClose9();
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 256 255"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M198.73 7.42998C207.804 -1.64032 222.46 -1.6911 231.64 7.48469L248.171 24.0197C257.276 33.1213 257.315 47.8397 248.23 56.9257L83.1596 221.996L33.6636 172.5L198.724 7.42968L198.73 7.42998Z"
                                    fill={darkMode ? "black" : "white"}
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0.660004 254.99L25.41 180.744L74.906 230.24L0.660004 254.99Z"
                                    fill={darkMode ? "black" : "white"}
                                />
                            </svg>
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal
                className={Style.model_dialog}
                show={show8}
                onHide={handleClose8}
            >
                <Modal.Body
                    style={{
                        backgroundColor: darkMode ? "#202124" : "white",
                    }}
                >
                    <form className={`${Style.create_form}`}>
                        <div class="form-outline">
                            <input
                                type="text"
                                id="form3Example1"
                                placeholder="Title"
                                className={`form-control ${Style.input_field} ${
                                    darkMode ? "text-white" : "text-dark"
                                } `}
                                style={{ fontSize: "1.375rem" }}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </div>
                        <div class="form-outline">
                            <input
                                type="text"
                                id="form3Example2"
                                placeholder="Tagline"
                                className={`form-control ${Style.input_field} ${
                                    darkMode ? "text-white" : "text-dark"
                                } `}
                                style={{ fontSize: "1rem" }}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                        </div>

                        <div class="form-outline mb-4">
                            <textarea
                                type="text"
                                id="form3Example3"
                                placeholder="Note"
                                className={`form-control ${Style.input_field} ${
                                    darkMode ? "text-white" : "text-dark"
                                } `}
                                style={{ fontSize: "0.9rem" }}
                                onChange={(e) => setNewDesc(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className={`btn btn-rounded rounded-circle ${
                                darkMode ? "btn-light" : "btn-success"
                            } ${Style.create_new_btn}`}
                            style={
                                darkMode
                                    ? {
                                          fontWeight: "600",
                                          alignSelf: "flex-end",
                                      }
                                    : {
                                          fontWeight: "500",
                                          backgroundColor: "#01cb63",
                                          border: "none",
                                          alignSelf: "flex-end",
                                      }
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                createNote();
                                handleClose8();
                            }}
                        >
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 404 404"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M202 0.402008C192.723 0.402008 185.199 7.92541 185.199 17.203V185.203H17.199C7.92171 185.203 0.397995 192.722 0.397995 202.004C0.397995 211.281 7.91751 218.805 17.199 218.805H185.199V386.805C185.199 396.082 192.722 403.606 202 403.606C211.278 403.606 218.801 396.083 218.801 386.805V218.805H386.801C396.078 218.805 403.602 211.282 403.602 202.004C403.602 192.726 396.083 185.203 386.801 185.203H218.801V17.203C218.801 7.92571 211.281 0.402008 202 0.402008V0.402008Z"
                                    fill={darkMode ? "black" : "white"}
                                />
                            </svg>
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Homepage;
