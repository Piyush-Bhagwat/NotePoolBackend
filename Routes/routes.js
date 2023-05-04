import express from "express";
import newPost from "../controllers/newPostCont.js";
import { fileDownload } from "../controllers/fileDownload.js";
import { readDataCollection, readHoldCollection } from "../Database/Firebase/firebaseConnect.js";
import approveContent from "../controllers/approveContent.js";

const router = express.Router();

router.route("/newpost").post(newPost);

router.route("/download").get(fileDownload);

router.route("/getdata").get(async (req,res)=>{
    const cls = req.query.cls;
    const sub = req.query.subject;

    readDataCollection(cls, sub).then((data)=>{
        res.status(200).json(data);
    });
});

router.route("/gethold").get(async (req, res)=>{
    readHoldCollection().then((data) => {
        res.status(200).json(data);
    });
});

router.route("/approvedata").get(approveContent);


export default router;
