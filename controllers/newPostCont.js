import { uploadFile } from "../Database/Firebase/firebaseConnect.js";
import nodeMailer from "nodemailer";

const sendMail = (fileName, name) => {
    var transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_EMAIL_PASSWORD,
        },
    });

    var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: "piyush.ast7@gmail.com",
        subject: "Uploaded File",
        text: `${fileName} was uploaded by ${name} go and approve it https://notespool.netlify.com/adminpi`,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

const newPost = async (req, res) => {
    const file = req.files.data;
    const fileName = req.body.fileName;

    const clas = req.body.class;
    const sub = req.body.subject;
    const name = req.body.name;
    const uid = req.body.uid;
    const format = req.body.format;

    await uploadFile(file.data, fileName, clas, sub, name, uid, format);
    sendMail(fileName, name);

    res.status(200).json({ success: true });
};

export default newPost;
