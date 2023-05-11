import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import expressUpload from "express-fileupload";

import routes from "./Routes/routes.js";

config({ path: "./config.env" });

const app = express();


app.use(cors({
    origin: "*",
}));
app.use("/public", express.static("public"));
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
