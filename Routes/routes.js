import express from "express";
import newPost from "../controllers/newPostCont.js";
import { fileDownload } from "../controllers/fileDownload.js";
import {
    readDataCollectionWithFilter,
    readHoldCollection,
} from "../Database/Firebase/firebaseConnect.js";
import approveContent from "../controllers/approveContent.js";
import { userUpload } from "../controllers/userUploadCont.js";
import getSingleNote from "../controllers/getSingleNote.js";
import deleteHandler from "../controllers/deleteCont.js";

const router = express.Router();

router.route("/newpost").post(newPost);

router.route("/download").get(fileDownload);

router.route("/getdata").get(async (req, res) => {
    const cls = req.query.cls;
    const sub = req.query.subject;

    readDataCollectionWithFilter(cls, sub).then((data) => {
        res.status(200).json(data);
    });
});

router.route("/getsinglenote").get(getSingleNote);

router.route("/gethold").get(async (req, res) => {
    readHoldCollection().then((data) => {
        res.status(200).json(data);
    });
});

router.route("/approvedata").get(approveContent);

router.route("/getuseruploads").get(userUpload);

router.route("/deletenote").get(deleteHandler);

router.route("/start").get((req, res) => {
    res.status(200).json({success: true});
})

export default router;
