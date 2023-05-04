import fs from "fs";
import { readData, readHold } from "../Database/Firebase/firebaseConnect.js";
import https from "https";

const fileDownload = async (req, res) => {
    fs.rmSync("./public", { recursive: true, force: true });

    fs.mkdirSync("./public", (err)=>{
        if(err) console.error(err)
    });

    const fileID = req.query.id;
    let fileInfo = false;

    await readData(fileID).then((info) => {
        fileInfo = info;
    });

    if (!fileInfo) {
        await readHold(fileID).then((info) => {
            fileInfo = info;
        });
    }

    const localPath = `./public/${fileInfo.name}`;

    const file = fs.createWriteStream(localPath);
    const request = await https.get(fileInfo.link, function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            res.download(localPath);
            console.log("Downloaded", fileInfo.name);
        });
    });
};

export { fileDownload };
