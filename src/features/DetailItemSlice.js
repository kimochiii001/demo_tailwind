
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {ethers} from 'ethers';

// import {marketplace, nft} from '../contract/contract';


export const getProfileItem = createAsyncThunk(
    'items/getProfileItem',
    async(itemId, nft, marketplace)=>{
        try {
          const item = await marketplace.items(itemId);

          console.log(item);
          // if (!item.sold) {
          
          // get uri url from nft contract
          const uri = await nft.tokenURI(item.tokenId);
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response.json();
          // get total price of item (item price + fee)
          const totalPrice = await marketplace.getTotalPrice(item.itemId);
     
          
          // Add item to items array
        const detailItem = {
          totalPrice,
           
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.title,
            description: metadata.description,
            image: metadata.fileUrl,
            sold: item.sold,
          };
          return detailItem
          
        } catch (error) {
          
        }
     
    }
  );


  const initialState = {
    item: {},
    editingPost: null,
    loading: false
} 
const detailItemSlice = createSlice({
    name: 'detailItem',
    initialState,
    reducers : {

    },

    extraReducers: {
        [getProfileItem.fulfilled]: (state, action) => {
            state.loading = false;
            state.item = action.payload;
        },
    }
})

const {reducer: detailItemReducer} = detailItemSlice;

export default detailItemReducer;