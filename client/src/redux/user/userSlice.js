import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.loading = true;
            state.error = null;
        },
        signInSucceeded: (state, action) => {
            // UserData is payload (the response from the server)
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { signInStart, signInSucceeded, signInFailed } = userSlice.actions;

export default userSlice.reducer;
