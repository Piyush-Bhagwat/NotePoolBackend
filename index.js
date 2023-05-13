import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import expressUpload from "express-fileupload";

import routes from "./Routes/routes.js";

config({ path: "./config.env" });

const app = express();

// app.use(
//     cors({
//         origin: ["https://notespool.netlify.app/", "http://localhost:3000", "*"],
//         methods: ["GET", "POST"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://notespool.netlify.app"); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use("/public", cors(), express.static("public"));
app.use(expressUpload());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use("/api", routes);

app.listen(process.env.PORT, () => {
    console.log("Server Started on", process.env.PORT);
});
