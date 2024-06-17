import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    groups: [],
    error: null,
};

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroups(state, action) {
            state.groups = action.payload;
            state.error = null;
        },
        addGroup(state, action) {
            state.groups.push(action.payload);
        },
        removeGroup(state, action) {
            state.groups = state.groups.filter(group => group._id !== action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearGroups(state) {
            state.groups = [];
            state.error = null;
        },
    },
});

export const { setGroups, addGroup, removeGroup, setError, clearGroups } = groupSlice.actions;
export default groupSlice.reducer;