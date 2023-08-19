import { createAsyncThunk } from "@reduxjs/toolkit"

const marketplaceABI = require("../marketplace-abi.json");
const nftABI = require("../nft-abi.json");
const marketplaceAddress ='0xBEa6c10c63D6c0256Cb4e70039Cfa40A247A3448';
const NFTAddress ='0x3A3A6bd75466c58fd822682eAe5E80f770EcE458';


    // Get deployed copies of contracts
    

 const initialState = {
    contractNFT: null,
    contractMarketplace: null,
    accounts: [],
    loadingErrorMessage: null,

}

const loadBlockchain = createAsyncThunk(
    "loadBlockchain",
    async(_, thunkAPI) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();

        const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer)
        const nft = new ethers.Contract(NFTAddress, nftABI, signer);

    }
);
