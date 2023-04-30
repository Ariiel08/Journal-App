import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { addNote, setActiveNote, setSaving, startAddNote } from "../../../src/store/journal";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Tests on Journal thunks', () => { 

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startAddNote should create a new note', async() => { 

        const uid = '123ABC';

        getState.mockReturnValue({auth: {uid}});

        await startAddNote()(dispatch, getState);
        
        expect(dispatch).toHaveBeenCalledWith(setSaving());
        expect(dispatch).toHaveBeenCalledWith(addNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: []
        }));

        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: []
        }));

        const newDoc = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(newDoc);

        const deleteDocsPromises = [];
        docs.forEach(doc => deleteDocsPromises.push(deleteDoc(doc.ref)));

        await Promise.all(deleteDocsPromises);
    });
});