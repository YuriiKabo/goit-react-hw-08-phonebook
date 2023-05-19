import { createSlice } from '@reduxjs/toolkit';
import { signUp, LogIn, LogOut, refreshUser} from 'redux/Authorisation/operations';

export const userValidationSlice = createSlice({
    name: 'authorisation',
    initialState: {
        user: {
            name: null,
            email: null,
        },
        token: null,
        isLoggedIn: false,
        isRefresh: false,
    },
    extraReducers: builder => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isRefresh = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isRefresh = false;
                state.isLoggedIn = true;
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
                state.token = action.payload.token;
            })
            .addCase(LogIn.fulfilled, (state, action) => {
                state.isRefresh = false;
                state.isLoggedIn = true;
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
                state.token = action.payload.token;
            })
            .addCase(LogIn.rejected, (state, action) => {
                state.isRefresh = false;
                state.error = action.payload;
            })
            .addCase(LogOut.fulfilled, (state) => {
                state.user.name = null;
                state.user.email = null;
                state.token = null;
                state.isRefresh = false;
                state.isLoggedIn = false;
            })
            .addCase(refreshUser.pending, (state) => {
                state.isRefresh = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                if (!action.payload) { return state };
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.isRefresh = false;
                state.isLoggedIn = true;
            })
            .addCase(refreshUser.rejected, (state, action) => {
                state.isRefresh = false;
            })
    },
});
