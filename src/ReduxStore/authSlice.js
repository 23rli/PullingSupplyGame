import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const register = createAsyncThunk('auth/register', async({test, comment}) =>{
    try {
        const res = await axios.post('http://localhost:8080', {test, comment});
        return res.data;
    } catch (err) {
        console.log(err)
    }
})


const initialState = {
    user: '',
    isRegistered: false,
    loading: false,
    error: null

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        unregister: (state, action) => {
            state.user = '';
            state.isRegistered = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.test;
                state.isRegistered = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(register.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isRegistered = false;
                state.loading = false;
                state.error = "An error has occured";
            })
    }
})

export const { unregister } = authSlice.actions

export default authSlice.reducer