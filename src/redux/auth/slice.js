import { register, logIn, logOut, refreshUser } from "./operations";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        })
        .addCase(register.pending, (state) => state)
        .addCase(register.rejected, (state) => state)
        .addCase(logIn.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        })
        .addCase(logIn.pending, (state) => state)
        .addCase(logIn.rejected, (state) => state)
        .addCase(logOut.fulfilled, (state) => {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
        })
        .addCase(logOut.pending, (state) => state)
        .addCase(logOut.rejected, (state) => state)
        .addCase(refreshUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isRefreshing = false;
        })
        .addCase(refreshUser.pending, (state) => {
            state.isRefreshing = true;
        })
        .addCase(refreshUser.rejected, (state) => {
            state.isRefreshing = false;
        }) 
    },
});

export const authReducer = authSlice.reducer;