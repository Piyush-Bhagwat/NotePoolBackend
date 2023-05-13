import { deleteDoc, doc } from "firebase/firestore";
import {
    addToTestData,
    db,
    deleteNote,
    readHold,
} from "../Database/Firebase/firebaseConnect.js";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../Database/Firebase/firebaseConnect.js";

const approveContent = async (req, res) => {
    const fileId = req.query.id;
    const toSave = req.query.tosave;

    await readHold(fileId).then(async (data) => {
        if(toSave === 'true'){
            await addToTestData(data);
            console.log(fileId, "Approved");
        } else {
            console.log(fileId, "Not Approved");
        }
        
        const objRef = ref(storage, data.fileLocation);
        await deleteObject(objRef);
        await deleteDoc(doc(db, "hold", fileId));
        res.status(200).redirect("https://notespool.netlify.app/adminpi");
    });
};

export default approveContent;
