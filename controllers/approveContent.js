import { deleteDoc, doc } from "firebase/firestore";
import {
    addToTestData,
    db,
    readHold,
} from "../Database/Firebase/firebaseConnect.js";

const approveContent = async (req, res) => {
    const fileId = req.query.id;
    const toSave = req.query.tosave;

    await readHold(fileId).then((data) => {
        if(toSave === 'true'){
            addToTestData(data);
            console.log(fileId, "Approved");
        } else {
            console.log(fileId, "Not Approved");
        }
        
        deleteDoc(doc(db, "hold", fileId));
        res.status(200).redirect("http://localhost:3000/adminpi");
    });
};

export default approveContent;
