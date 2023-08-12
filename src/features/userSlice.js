import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getUser= createAsyncThunk('user/getUser', async() => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
})

const userSlice = createSlice({
    name:'user',
    initialState: {
        current: '',
        loading: false,
        error: "",
    },
    reducers: {
        
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.loading = true;
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.current = action.payload
        },
    },

});

const {reducer: userReducer} = userSlice;

export default userReducer;