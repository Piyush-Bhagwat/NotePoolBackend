import { uploadFile } from "../Database/Firebase/firebaseConnect.js";

const newPost = async (req, res) => {
    const file = req.files.data;
    const fileName = file.name;

    const tags = req.body.tags
    const clas = req.body.class;
    const sub = req.body.subject
    const name = req.body.name;
    const uid = req.body.uid;
    await uploadFile(file.data, fileName, clas, sub, tags, name, uid)
    
    res.status(200).json({success: true});
}


export default newPost;