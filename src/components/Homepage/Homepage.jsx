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
import Style from "./Homepage.module.css";

function Homepage() {
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

    const createNote = async () => {
        const ref = await addDoc(collection(db, "notes"), {
            title: newTitle,
            tagline: newTag,
            description: newDesc,
        });
        setNewTitle("");
        setNewTag("");
        setNewDesc("");
        console.log("IDE", ref.id);
    };

    const deleteNote = async (note) => {
        await deleteDoc(doc(db, "notes", note.id));
    };

    const editNote = async () => {
        const docRef = doc(db, "notes", selectedItem.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                title: newTitle || docSnap.data().title,
                tagline: newTag || docSnap.data().tagline,
                description: newDesc || docSnap.data().description,
            });
            setNewTitle("");
            setNewTag("");
            setNewDesc("");
        } else {
            console.log("No such document!");
        }
    };

    useEffect(async () => {
        onSnapshot(collection(db, "notes"), (snapshot) => {
            setNotes(snapshot.docs);
        });
    }, []);

    return (
        <>
            <Container>
                <Row>
                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => {
                            handleShow8();
                        }}
                    >
                        Create Note
                    </button>
                </Row>
                <Row className={` ${Style.notes_row}`}>
                    {notes.map((note, index) => (
                        <div
                            className={`col-sm-4 border border-2 rounded-3 ${Style.note}`}
                            key={index}
                        >
                            <p>{note.data().title}</p>
                            <p>{note.data().tagline}</p>
                            <p>{note.data().description}</p>
                            <button
                                class="btn btn-primary btn-block mb-4 add_recipe_button"
                                onClick={(e) => {
                                    setSelectedItem(note);
                                    handleShow9();
                                }}
                            >
                                EDIT ITEM
                            </button>

                            <button
                                class="btn btn-primary btn-block mb-4 add_recipe_button"
                                onClick={() => {
                                    deleteNote(note);
                                }}
                            >
                                DELETE ITEM
                            </button>
                        </div>
                    ))}
                </Row>
            </Container>
            <Modal
                className={Style.model_dialog}
                show={show9}
                onHide={handleClose9}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className={Style.login_prompt}>
                        <h1
                            style={{ color: `#162d3d` }}
                            className={Style.header_login}
                        >
                            Edit Recipe
                        </h1>
                    </div>
                    <form>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form3Example3">
                                Title
                            </label>
                            <input
                                type="text"
                                id="form3Example1"
                                className={`form-control ${Style.input_field}`}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </div>

                        <div class="form-outline">
                            <label class="form-label" for="form3Example1">
                                Tagline
                            </label>
                            <input
                                type="text"
                                id="form3Example1"
                                className={`form-control ${Style.input_field}`}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                        </div>

                        <div class="form-outline">
                            <label class="form-label" for="form3Example2">
                                Description
                            </label>
                            <textarea
                                type="text"
                                id="form3Example2"
                                className={`form-control ${Style.input_field}`}
                                onChange={(e) => setNewDesc(e.target.value)}
                            />
                        </div>

                        <button
                            class="btn btn-primary btn-block mb-4 add_recipe_button"
                            onClick={(e) => {
                                e.preventDefault();
                                editNote(e, selectedItem);
                                handleClose9();
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal
                className={Style.model_dialog}
                show={show8}
                onHide={handleClose8}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className={Style.login_prompt}>
                        <h1
                            style={{ color: `#162d3d` }}
                            className={Style.header_login}
                        >
                            Create Recipe
                        </h1>
                    </div>
                    <form>
                        <div class="form-outline">
                            <label class="form-label" for="form3Example1">
                                Enter Title
                            </label>
                            <input
                                type="text"
                                id="form3Example1"
                                className={`form-control ${Style.input_field}`}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </div>
                        <div class="form-outline">
                            <label class="form-label" for="form3Example2">
                                Enter Tagline
                            </label>
                            <input
                                type="text"
                                id="form3Example2"
                                className={`form-control ${Style.input_field}`}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                        </div>

                        <div class="form-outline mb-4">
                            <label class="form-label" for="form3Example3">
                                Enter Description
                            </label>
                            <textarea
                                type="text"
                                id="form3Example3"
                                className={`form-control ${Style.input_field}`}
                                onChange={(e) => setNewDesc(e.target.value)}
                            />
                        </div>

                        <button
                            class="btn btn-primary btn-block mb-4 add_recipe_button"
                            onClick={(e) => {
                                e.preventDefault();
                                createNote();
                                handleClose8();
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Homepage;
