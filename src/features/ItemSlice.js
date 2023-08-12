import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {ethers} from 'ethers';


// {
//     totalPrice:'',
   
//     itemId: '',
//     seller: '',
//     name: '',
//     description: '',
//     image: '',
//     sold: false,
// },
const marketplaceABI = require("../marketplace-abi.json");
  const nftABI = require("../nft-abi.json");
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const marketplaceAddress ='0xBEa6c10c63D6c0256Cb4e70039Cfa40A247A3448';
const NFTAddress ='0x3A3A6bd75466c58fd822682eAe5E80f770EcE458';
// const connectedWallet = wallet.connect(provider);
// Set signer
    const signer = provider.getSigner();


    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer)
 
    console.log(marketplace);

    const nft = new ethers.Contract(NFTAddress, nftABI, signer);
    console.log(nft);
 

const initialState = {
    items: [],
    editingPost: null,
    loading: false
} 

export const getItemList = createAsyncThunk(
    'items/getItemList',
    async(_, thunkAPI)=>{
        const itemCount =  await marketplace.itemCount();
        let items = [];
        for (let i = 1; i <= itemCount; i++) {
                  const item = await marketplace.items(i);
                  // if (!item.sold) {
                //   console.log(`sold ${!item.sold}`);
                  // get uri url from nft contract
                  const uri = await nft.tokenURI(item.tokenId);
                  // use uri to fetch the nft metadata stored on ipfs
                  const response = await fetch(uri);
                  const metadata = await response.json();
                  // get total price of item (item price + fee)
                  const totalPrice = await marketplace.getTotalPrice(item.itemId);
                  const priceFinal = ethers.utils.formatEther(totalPrice);
                  // Add item to items array
                  items.push({
                    priceFinal,
                   
                    itemId: item.itemId.toString(),
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                    sold: item.sold,
                  });
                };
                return items;
    }
);


const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
      
       
    },

    extraReducers(builder) {
        builder.addCase(getItemList.fulfilled, (state, action) =>{
            state.items = action.payload;

        })
    }

})


const {actions, reducer} = itemSlice;

export default reducer;
