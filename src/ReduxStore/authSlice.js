import { createSlice } from '@reduxjs/toolkit'


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
    }
})

export const { unregister } = authSlice.actions

export default authSlice.reducer