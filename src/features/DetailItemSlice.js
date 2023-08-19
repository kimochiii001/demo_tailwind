
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {ethers} from 'ethers';

import {marketplace, nft} from '../contract/contract';

export const getProfileItem = createAsyncThunk(
    'items/getProfileItem',
    async(itemId)=>{
        
      const item = await marketplace.items(itemId);
      // if (!item.sold) {
      
      // get uri url from nft contract
      const uri = await nft.tokenURI(item.tokenId);
      // use uri to fetch the nft metadata stored on ipfs
      const response = await fetch(uri);
      const metadata = await response.json();
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(item.itemId);
      const priceFinal = ethers.utils.formatEther(totalPrice);
      
      // Add item to items array
    const detailItem = {
      priceFinal,
       
        itemId: item.itemId.toString(),
        seller: item.seller,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        sold: item.sold,
      };
       return detailItem;
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