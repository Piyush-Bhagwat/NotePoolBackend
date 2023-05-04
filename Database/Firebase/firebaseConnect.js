import { initializeApp } from "firebase/app";
import { config } from "dotenv";
import {
    getFirestore,
    setDoc,
    addDoc,
    collection,
    getDoc,
    doc,
    getDocs,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

config({ path: "./config.env" });

const firebaseConfig = {
    apiKey: process.env.FIRE_API_KEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    projectId: process.env.FIRE_PROJECT_ID,
    storageBucket: process.env.FIRE_STORAGE,
    messagingSenderId: process.env.FIRE_MESSAGING_SENDER,
    appId: process.env.FIRE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

// read();

const uploadFile = async (file, name, cls, sub, tags, userName, uid) => {
    const date = new Date();
    const storageName =
        date.getTime() + "_" + name.toLowerCase().replace(/\s/g, "_");
    const createdOn = `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()}`;
    const savePath = `/testData/${cls}/${sub}/${storageName}`;

    const sourceRef = ref(storage, savePath);
    await uploadBytes(sourceRef, file);
    const downloadLink = await getDownloadURL(sourceRef);
    await addToHold({
        createdOn,
        name,
        tags,
        class: cls,
        subject: sub,
        link: downloadLink,
        userName,
        uid
    });

    console.log(name, "Uploaded");
};

const dataRef = collection(db, "data");
const holdRef = collection(db, "hold");
// const helpRef = collection(db, 'help');
// const usersRef = collection(db, 'users');

console.log("FireBase app started");

const addToTestData = async (data) => {
    await addDoc(dataRef, data);
};

const addToHold = async (data) => {
    await addDoc(holdRef, data);
};

const readData = async (fileID) => {
    const docRef = doc(db, "data", fileID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};
const readHold = async (fileID) => {
    const docRef = doc(db, "hold", fileID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

const readDataCollection = async (cls, sub) => {
    const data = await getDocs(dataRef);
    return data.docs.map((dat) => {
        if (
            dat.data().class === cls &&
            (dat.data().subject === sub || sub === "all")
        ) {
            return { ...dat.data(), id: dat.id };
        }
    });
};

const readHoldCollection = async () => {
    const data = await getDocs(holdRef);
    return data.docs.map((dat) => {
        return { ...dat.data(), id: dat.id };
    });
};

export {
    app,
    db,
    addToTestData,
    addToHold,
    readData,
    readHold,
    readDataCollection,
    readHoldCollection,
    uploadFile,
};
