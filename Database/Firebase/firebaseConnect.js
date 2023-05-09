import { initializeApp } from "firebase/app";
import { config } from "dotenv";
import {
    getFirestore,
    addDoc,
    collection,
    getDoc,
    doc,
    getDocs,
    deleteDoc,
} from "firebase/firestore";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
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

const uploadFile = async (file, name, cls, sub, userName, uid, format) => {
    const date = new Date();
    const storageName =
        date.getTime() + "_" + name.toLowerCase().replace(/\s/g, "_");
    const createdOn = `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()}`;
    const savePath = `/data/${cls}/${sub}/${storageName}`;

    const sourceRef = ref(storage, savePath);
    await uploadBytes(sourceRef, file);
    const downloadLink = await getDownloadURL(sourceRef);
    await addToHold({
        createdOn,
        name,
        class: cls,
        subject: sub,
        link: downloadLink,
        userName,
        uid,
        format,
        fileLocation: savePath,
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

const readDataCollectionWithFilter = async (cls, sub) => {
    const data = await getDocs(dataRef);

    const notesToSend = data.docs.filter((dat) => {
        return (
            dat.data().class === cls &&
            (dat.data().subject === sub || sub === "all")
        );
    });
    return notesToSend.map((dat) => {
        return { ...dat.data(), id: dat.id };
    });
};
const readDataCollection = async () => {
    const data = await getDocs(dataRef);
    return data.docs.map((dat) => {
        return { ...dat.data(), id: dat.id };
    });
};

const readHoldCollection = async () => {
    const data = await getDocs(holdRef);
    return data.docs.map((dat) => {
        return { ...dat.data(), id: dat.id };
    });
};

const deleteNote = async (fileLocation, noteID) => {
    const deleteNoteRef = ref(storage, fileLocation);
    console.log(fileLocation);
    await deleteObject(deleteNoteRef);

    const deleteDocRef = doc(db, "data", noteID);
    await deleteDoc(deleteDocRef);
};

export {
    app,
    db,
    storage,
    addToTestData,
    addToHold,
    readData,
    readHold,
    readDataCollectionWithFilter,
    readDataCollection,
    readHoldCollection,
    uploadFile,
    deleteNote,
};
