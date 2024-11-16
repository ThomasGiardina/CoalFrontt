import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    issue: '',
    photos: [],
    description: '',
    success: false,
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setName: (state, action) => { state.name = action.payload; },
        setIssue: (state, action) => { state.issue = action.payload; },
        setPhotos: (state, action) => { state.photos = action.payload; },
        setDescription: (state, action) => { state.description = action.payload; },
        setSuccess: (state, action) => { state.success = action.payload; },
        resetForm: () => initialState,
    },
});

export const { setName, setIssue, setPhotos, setDescription, setSuccess, resetForm } = contactSlice.actions;
export default contactSlice.reducer;