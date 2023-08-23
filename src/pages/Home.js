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
import LoadingCard from "../components/LoadingCard";
import MenuTab from "../components/MenuTab";
import Progress from "../components/SpinnerLoading";
import PopUpLoading from "../components/PopUpLoading";
import ArtWork from "../components/ArtWork";
import ArtItem from "../components/ArtItem";
import ShowNft from "../components/ShowNft";
import SetPrice from "../components/SetPrice";
import Loading from "../components/Loading";
import { setGlobalState, setLoadingMsg } from "../global";
import ReactPaginate from 'react-paginate';

const Home = ({ marketplace, nft, account }) => {

  const [title, setTitle] = useState('');
    const [loadingPopUp, setLoadingPopUp] = useState(false);
    const [open, setOpen] = useState(false);
    const handleToClose = (event, reason) => {
      if ("clickaway" == reason) return;
      setOpen(false);
  };
  const pageCount = 4;

  const handlePageClick = () => {

  }
  const handleClickEvent = () => {
      setOpen(true);
  };
  // const itemList = useSelector(state => state.items.items);
  // const loadingItem = useSelector(state => state.items.loading);
  // const loadingItem = useSelector(state => state.items.loading);


  // const userId = useSelector(state => state.user.current);
  // console.log('loadingItem', loadingItem);

  // console.log('itemList', itemList);
  // console.log('lenght', itemList.length);


  
  const dispath = useDispatch()

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [sold, setSold] = useState([]);
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState(null);



  const loadMarketplaceItems = async () => {
    setLoadingMsg('loading...');
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    console.log(`ITEM COUNT: ${itemCount}`);
    let items = [];
  
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      // if (!item.sold) {
      if(!item.sold) {
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
      }

      // get uri url from nft contract
      
      // }
    }
    setItems(items);
    setLoading(false);
    setGlobalState('loading',{show: false})

    
  };
  const loadMarketplaceItemsOnSale = async () => {
    // Load all unsold items
    // const itemCount = await marketplace.itemCount();
    // console.log(`ITEM COUNT: ${itemCount}`);
    let items = [];
  
    const item = await marketplace.getAllNftsOnSale();
    // console.log(item[0]);
    
  
    for (let i = 0; i < item.length; i++) {
    //   console.log(item[i].itemId);
    // console.log(item[i].nft);
  
    
      console.log(`sold ${!item[i].sold}`);
      // get uri url from nft contract
      const uri = await nft.tokenURI(item[i].tokenId);
      // use uri to fetch the nft metadata stored on ipfs
      const response = await fetch(uri);
      const metadata = await response.json();
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(item[i].itemId);
  
      items.push({
        totalPrice,
       
        itemId: Number(item[i].itemId),
        seller: item[i].seller,
        name: metadata.title,
        description: metadata.description,
        image: metadata.image,
        sold: item[i].sold,
      
      });    
    }
    setItems(items);
    setLoading(false);
    setGlobalState('loading',{show: false})

   
  };

  // const loadMarketplaceItemsOnSale = async () => {
  //   // Load all unsold items
 
  //   let items = [];
  //   const item = await marketplace.getAllNftsOnSale();
  //   for (let i = 0; i <= item.length; i++) {
  //       // console.log(item[i]);
   
      
  //     //get uri url from nft contract
  //     const uri = await nft.tokenURI(item[i].tokenId);
  //     // use uri to fetch the nft metadata stored on ipfs
  //     const response = await fetch(uri);
  //     const metadata = await response.json();
  //     // get total price of item (item price + fee)
  //     const totalPrice = await marketplace.getTotalPrice(item[i].itemId);
  //     //Add item to items array
  //     items.push({
  //       totalPrice,
       
  //       itemId: item[i].itemId,
  //       seller: item[i].seller,
  //       name: metadata[i].title,
  //       description: metadata[i].description,
  //       image: metadata[i].fileUrl,
  //       sold: item[i].sold,
  //     });
      
  //   }
  //   setLoading(false);
  //   setItems(items);
  //   setGlobalState('loading',{show: false})

  // };



  const buyMarketItem = async (item) => {
    try {
      await (
        await marketplace.purchaseItem(item.itemId, { value: item.totalPrice})
      ).wait();
      // loadMarketplaceItems();

      handleClickEvent();
      setLoadingPopUp(true);
    } catch (error) {
      handleClickEvent();
            setLoadingPopUp(false);
            console.log('err buy', error);
    }
   
    
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
  // useEffect(() => {

  //   const connectAccount = async () => {
     

  //     // console.log('account', account);
  //     await dispath(getItemList());
    
  //   }
    
  //   connectAccount();
   
  // }, []);

  useEffect(() => {
    loadMarketplaceItemsOnSale();
  },[]);


if(loading)
  return (
<div className="w-[90%] mx-auto my-10 ">
    <Loading/>


</div>
)
  return (
       
  
      <div className=" w-[90%] mx-auto my-10 ">

    
 
        <ArtWork>
          {
            items.map((item, idx) => (
              <ArtItem nft={item} key={idx}  />
            ))
          }
        </ArtWork>

        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center items-center space-x-2 mt-20"
        activeClassName="bg-gray-900 text-white p-2"
        pageClassName="bg-gray-200 p-2 aspect-square w-10 text-center rounded"
        previousClassName="bg-gray-200 p-2  text-center rounded"
        nextClassName="bg-gray-200 p-2  text-center rounded"
      />

        
        <ShowNft nft={nft} marketplace={marketplace} account={account}  />
        <SetPrice marketplace={marketplace}/>

       
       

        {/* <div className="">
       
          {items.length > 0  ? (

            <div className="grid grid-rows-1 lg:grid-cols-4   gap-4">
              {
                 items.map((item, idx) => (
                  <Items item={item} key={idx}  onBuy={true} account={account} OnClose={handleToClose} open={open} loading={loadingPopUp} onClick={() => {
                    buyMarketItem(item).then( async() => {
                      await loadMarketplaceItems();
                    })
                  }} />
                ))
              }
            </div>
           
            
   
          ) : (
           
            <div className=" grid grid-rows-1 lg:grid-cols-4   gap-4">
             <p> CHƯA COS SAN PHAM</p>
             
            
              


            </div>
            
          )}
        </div> */}
      </div>
    
  );
};

export default Home;
