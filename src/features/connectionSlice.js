import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ethers } from "ethers";

const marketplaceABI = require("../marketplace-abi.json");
const nftABI = require("../nft-abi.json");
const marketplaceAddress ='0x1E3982F767e005140a4E737B7af9C74711D63Ca1';
const NFTAddress ='0x3A3A6bd75466c58fd822682eAe5E80f770EcE458';


    // Get deployed copies of contracts
    

 const initialState = {
    contractNFT: null,
    contractMarketplace: null,
    accounts: [],
    loadingErrorMessage: null,

}

export const loadBlockchain = createAsyncThunk(
    "loadBlockchain",
    async(_, thunkAPI) => {

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer)
            const nft = new ethers.Contract(NFTAddress, nftABI, signer);
            return {marketplace, nft}
            
        } catch (error) {
            console.log('err connect bc', error);
        }
       

    }
);


const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers : {

    },

    extraReducers: {
        [loadBlockchain.fulfilled]: (state, {payload}) => {
            state.contractNFT = payload.nft;
            state.contractMarketplace = payload.marketplace;
        },
    }
})

const {reducer: connectionReducer} = connectionSlice;

export default connectionReducer;