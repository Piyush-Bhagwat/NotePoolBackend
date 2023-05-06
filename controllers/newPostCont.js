import { uploadFile } from "../Database/Firebase/firebaseConnect.js";

const newPost = async (req, res) => {
    const file = req.files.data;
    const fileName = req.body.fileName;

    const clas = req.body.class;
    const sub = req.body.subject
    const name = req.body.name;
    const uid = req.body.uid;
    const format = req.body.format;
    
    await uploadFile(file.data, fileName, clas, sub, name, uid, format);
    
    res.status(200).json({success: true});
}


export default newPost;