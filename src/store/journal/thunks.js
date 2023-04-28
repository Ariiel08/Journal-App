import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNote, deleteNoteById, setActiveNote, setImagesNote, setNotes, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startAddNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        newNote.imageUrls = [];

        dispatch(addNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;

        if (!uid) throw new Error(`User UID doesn't exist`);

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const note = {...activeNote};
        delete note.id;

        const noteDoc = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(noteDoc, note, {merge: true});

        dispatch(updateNote(activeNote));
    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());

        // await fileUpload(files[0]);
        const fileUploadPromises = [];
        for (const file of files){
            fileUploadPromises.push(fileUpload(file));
        }

        const imagesUrls = await Promise.all(fileUploadPromises);
        dispatch(setImagesNote(imagesUrls));
    };
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {activeNote} = getState().journal;

        const noteDoc = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await deleteDoc(noteDoc);

        dispatch(deleteNoteById(activeNote.id));
    }
}