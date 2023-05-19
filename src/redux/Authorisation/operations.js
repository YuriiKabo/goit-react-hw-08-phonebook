import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

function setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

function clearToken() {
    axios.defaults.headers.common.Authorization = '';
};

export const signUp = createAsyncThunk(
    'authorisation/signUp',
    async function (newUser, thunkAPI) {
        try {
            const response = await axios.post(`/users/signup`, newUser);
            setToken(response.data.token);
            return response.data;
        } catch (error) {
            Notiflix.Report.failure(error.message);
            thunkAPI.rejectWithValue(error.message);
        };
    },
);

export const LogIn = createAsyncThunk(
    'authorisation/LogIn',
    async function (user, thunkAPI) {
        try {
            const response = await axios.post(`/users/login`, user);
            setToken(response.data.token);
            return response.data;
        } catch (error) {
            Notiflix.Report.failure('wrong email or password!!!');
            thunkAPI.rejectWithValue(error.message);
        };
    },
);

export const LogOut = createAsyncThunk(
    'authorisation/LogOut',
    async function (_, thunkAPI) {
        try {
            const response = await axios.post(`/users/logout`);
            clearToken();
            return response.data
        } catch (error) {
            Notiflix.Report.failure(error.message)
            thunkAPI.rejectWithValue(error.message);
        };
    },
);

export const refreshUser = createAsyncThunk(
    'authorisation/refreshUser',
    async (_, thunkAPI) => {
        const { token } = thunkAPI.getState().authorisation;
        if (token === null) {
            return thunkAPI.rejectWithValue('no valid token');
        };
        try {
            setToken(token);
            const response = await axios.get('/users/current');
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.data.message);
        };
    },
);