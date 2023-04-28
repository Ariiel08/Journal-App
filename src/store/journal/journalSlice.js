import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null
    },
    reducers: {
        addNote: (state, {payload}) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, {payload}) => {
            state.activeNote = payload;
        },
        setNotes: (state, {payload}) => {
            state.notes = payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        setImagesNote: (state, {payload}) => {
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...payload];
            state.isSaving = false;
        },
        updateNote: (state, {payload}) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === payload.id) return payload; 

                return note;
            });
        },
        deleteNoteById: (state, {payload}) => {
            state.activeNote = null;
            state.notes = state.notes.filter(note => note.id !== payload);

            console.log('Eliminado');
        },
        clearNotes: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        }
    }
});


export const { 
    addNote,
    setActiveNote,
    setNotes,
    setSaving,
    setImagesNote,
    updateNote,
    deleteNoteById,
    clearNotes 
} = journalSlice.actions;