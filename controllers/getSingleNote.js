import { db } from "../Database/Firebase/firebaseConnect.js";
import { doc, getDoc } from "firebase/firestore";

const getSingleNote = async (req, res) => {
    const noteID = req.query.id;
    const noteRef = doc(db, "data", noteID);
    const note = await (getDoc(noteRef));

    res.status(200).json(note.data());
};

export default getSingleNote;
