import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Header from "../components/Header";
import Story from "../components/Story";
import Featured from "../components/Featured";
import { ethers } from "ethers";
import featuredMg from "../assets/featured-mug-01.jpg";
import Items from "../components/Items";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { getItemList } from "../features/ItemSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getUser } from "../features/userSlice";

const Home = ({ marketplace, nft, account }) => {
  const itemList = useSelector(state => state.items.items);
  // const userId = useSelector(state => state.user.current);
  console.log('itemList', itemList);

  
  const dispath = useDispatch()

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [sold, setSold] = useState([]);
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState(null);



  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    console.log(`ITEM COUNT: ${itemCount}`);
    let items = [];
  
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      // if (!item.sold) {
      console.log(`sold ${!item.sold}`);
      // get uri url from nft contract
      const uri = await nft.tokenURI(item.tokenId);
      // use uri to fetch the nft metadata stored on ipfs
      const response = await fetch(uri);
      const metadata = await response.json();
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(item.itemId);
      // Add item to items array
      items.push({
        totalPrice,
       
        itemId: item.itemId,
        seller: item.seller,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        sold: item.sold,
      });
      // }
    }
    setLoading(false);
    setItems(items);
  };

  const loadMarketplaceItemsOnSale = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    console.log(`ITEM COUNT: ${itemCount}`);
    let items = [];
    const item = await marketplace.getAllNftsOnSale();
    for (let i = 0; i <= item.length; i++) {
        console.log(item[i]);
      // if (!item.sold) {
      
      // get uri url from nft contract
      // const uri = await nft.tokenURI(item[i].tokenId);
      // // use uri to fetch the nft metadata stored on ipfs
      // const response = await fetch(uri);
      // const metadata = await response.json();
      // // get total price of item (item price + fee)
      // const totalPrice = await marketplace.getTotalPrice(item[i].itemId);
      // Add item to items array
      // items.push({
      //   totalPrice,
       
      //   itemId: item[i].itemId,
      //   seller: item[i].seller,
      //   name: metadata[i].name,
      //   description: metadata[i].description,
      //   image: metadata[i].image,
      //   sold: item[i].sold,
      // });
      // }
    }
    // setLoading(false);
    // setItems(items);
  };



  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItems();
  };
  const setPriceProduct = async () => {
    const id = await nft.tokenCount();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    console.log(listingPrice);
    await(await marketplace.changePriceItem(id, listingPrice)).wait();
  }
  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
  }
  const checkBalancesOf = async () => {
    const balanceOwner = formatBalance(await nft.balanceOf(address));
    setBalance(balanceOwner);
    console.log(balance);
  }
//to={`/detailItem/${item.itemId.toString()}`}
  useEffect(() => {

    const connectAccount = async () => {
      if (account === '') {
        return;
      };

      // console.log('account', account);
      const actionResult =  dispath(getItemList());
      // const actionUser = dispath(getUser());
    //    await unwrapResult(actionUser);
    //  await unwrapResult(actionResult);
      // loadMarketplaceItems();
    }
    
    connectAccount();
   

    // loadMarketplaceItemsOnSale();
   
  }, []);
  return (
    <div>
      <Slider />
      {/* <Story/> */}
      <div className="w-[80%] mx-auto my-20 ">
        <div className="flex justify-center items-center mb-20">
          <div className="w-5 h-px bg-gray-400"></div>
     
          {/* <div className="mx-2 uppercase tracking-wide"> {itemList} </div> */}
          {/* <div className="mx-2 uppercase tracking-wide"> {userId}</div> */}

          <div className="w-5 h-px bg-gray-400"></div>
        </div>

        <div className="grid grid-rows-1 lg:grid-cols-4   gap-4">
          {items.length > 0 ? (
            <div className="">
              {items.map((item, idx) => (
                <div  key={idx}>
                  <div className="h-[340px] border-2 border-coffee-400">
                    <a href="#">
                      <div className="group w-full h-full relative hover:bg-gray-900 hover:bg-opacity-20 ">
                        <img
                          src={`${item.image}`}
                          className="w-full h-full bg-no-repeat bg-cover"
                        />
                        <div className=" absolute w-[100px] bg-white text-center  py-2 px-4 top-2 right-2 font-medium text-coffee-400">
                          {item.sold === true ? "Sold" : "On Sale"}
                        </div>
                        {item.sold !== true && item.seller !== account ? (
                          <button
                            onClick={() => buyMarketItem(item)}
                            className=" hidden group-hover:block absolute bottom-2 w-11/12 left-1/2 -translate-x-1/2 bg-white text-center  py-2 px-4 bottom-2 tracking-wide font-medium"
                          >
                            BUY FOR
                          </button>
                        ) : (
                          <p> </p>
                        )}
                      </div>
                    </a>
                  </div>

                  <div className="text-center py-5">
                    <a href="#" className="">
                      <div className="uppercase font-medium hover:opacity-80 mb-2">
                        {item.name}
                      </div>
                      
                    </a>

                    <div>
                      <span className="text-coffee-400 font-medium">
                        {ethers.utils.formatEther(item.totalPrice)} ETH
                      </span>
                      <span className="ml-2  text-gray-400">
                      {item.itemId.toString()}
                      </span>
                    </div>
                    <div className='mb-10'>
       
      
     </div>
   
    
     
      

                    
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Items />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
