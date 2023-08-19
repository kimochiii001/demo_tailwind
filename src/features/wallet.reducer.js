import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    walletAddress:"",
    balance: 0
};


const walletSlice = createSlice({
    name:"wallet",
    initialState,
    reducers: {
        setWalletInfo: (state, action) => {
            state.walletAddress = action.payload.walletAddress;
            state.balance = action.payload.balance;
        }
    }
});


export const {setWalletInfo} = walletSlice.actions;

export default walletSlice.reducer;