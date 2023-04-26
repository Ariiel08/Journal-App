import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null
        // active: {
        //     id: 'abc',
        //     title: '',
        //     body: '',
        //     date: 123,
        //     imageUrls: []
        // }
    },
    reducers: {
        addNote: (state, {payload}) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, {payload}) => {
            console.log({payload});
            state.activeNote = payload;
        },
        setNotes: (state, {payload}) => {
            state.notes = payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        }
    }
});


export const { 
    addNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById 
} = journalSlice.actions;