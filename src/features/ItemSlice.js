import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BigNumber, ethers} from 'ethers';

import {marketplace, nft} from '../contract/contract';

 

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



export const addNewItem = createAsyncThunk('items/addNewItem', async(_, thunkAPI) => {
  
})

export const getItemListOwnerOf = createAsyncThunk(
  'items/getItemList',
  async(_, thunkAPI)=>{
    const item = await marketplace.getItemOwnerOf();
    let items = [];

  for (let i = 0; i < item.length; i++) {

    // get uri url from nft contract
    const uri = await nft.tokenURI(item[i].tokenId);
    // use uri to fetch the nft metadata stored on ipfs
    const response = await fetch(uri);
    const metadata = await response.json();
    // get total price of item (item price + fee)
    const totalPrice = await marketplace.getTotalPrice(item[i].itemId);
    
    const priceFinal = ethers.utils.formatEther(totalPrice);

    items.push({
      priceFinal,
     
      itemId: item[i].itemId.toString(),
      seller: item[i].seller,
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
      sold: item[i].sold,});    
  }
  
        return items;
  }
);

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
      
       
    },

    extraReducers: {
      [getItemList.pending]: (state) => {
        state.loading = true;
    },
    [getItemList.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
      [getItemList.fulfilled]: (state, action) => {
        state.loading = false;
        state.items = action.payload;
    },
    [getItemListOwnerOf.fulfilled] : (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    
       
    }

})


const {actions, reducer} = itemSlice;

export default reducer;
