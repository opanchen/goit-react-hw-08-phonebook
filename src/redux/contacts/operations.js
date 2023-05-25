import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fakeImgAPI } from "helpers/fakeImgAPI";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/contacts');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async ({name, number}, thunkAPI) => {
        try {
            const response = await axios.post('/contacts', { name, number});

            fakeImgAPI.setRandomImg(response.data.id);

            toast.success(`${name} has been added to the contact list successfully!`)
            return response.data;
        } catch (error) {
            toast.error(error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            toast.success('Contact has been removed.')
            return response.data;
        } catch (error) {
            toast.error(error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const editContact = createAsyncThunk(
    'contacts/editContact',
    async ({id:contactId, name, number}, thunkAPI) => {
        try {
            const response = await axios.patch(`/contacts/${contactId}`, {name, number});
            toast.success('Contact has been changed!')
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
