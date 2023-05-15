import { deleteNote, readData } from "../Database/Firebase/firebaseConnect.js";
// import {ref} from "firebase/storage"

const deleteHandler = async (req,res)=>{
    const noteID = req.query.id;

    readData(noteID).then((data)=>{
        deleteNote(data.fileLocation, noteID);
        res.status(200).redirect("https://notespool.netlify.app/adminpi/home");
    })

    console.log("Deleteted: ", noteID);
}

export default deleteHandler