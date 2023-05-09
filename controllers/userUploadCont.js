import { readHoldCollection, readDataCollection } from "../Database/Firebase/firebaseConnect.js";

const userUpload = async (req, res) => {
    const userID = req.query.id;

    var dataOnHold = [];
    var dataUploaded = [];

    await readHoldCollection().then((data) => {
        data.map((note) => {
            if(note.uid === userID){
                dataOnHold.push(note);
            } 
        })
        
    });
    await readDataCollection().then((data) => {
        data.map((note) => {
            if(note.uid === userID){
                dataUploaded.push(note);
            } 
        })
        
    });

    res.status(200).json({hold: dataOnHold, uploaded: dataUploaded});
}

export {userUpload};