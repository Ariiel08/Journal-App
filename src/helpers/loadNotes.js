import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async(uid = '') => {
    if (!uid) throw new Error(`User UID doesn't exist`);

    const notesCollection = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(notesCollection);

    const notes = [];

    docs.forEach( doc => {
        notes.push({id: doc.id, ...doc.data()});
    });

    return notes;
}