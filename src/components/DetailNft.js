

import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import featuredMg from '../assets/featured-mug-01.jpg';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileItem } from '../features/DetailItemSlice';
import SetPrice from './SetPrice';
import { setGlobalState, setLoadingMsg } from '../global';
import { ethers } from 'ethers';
import Loading from './Loading';

const DetailNft = ({marketplace, nft, account}) => {
    const { itemId } = useParams();
    const [item, setItem] = useState([]);
  const detail = useSelector(state => state.detailItem.item);
  console.log('detail item', detail);
  console.log('account  in detail', account);
  const dispath = useDispatch();
 

    const loadMarketplaceItems = async () => {
        // Load all unsold items
       
      
    
          const item = await marketplace.items(itemId);
          // if (!item.sold) {
        //   console.log(`sold ${!item.sold}`);
          // get uri url from nft contract
          const uri = await nft.tokenURI(item.tokenId);
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response.json();
          // get total price of item (item price + fee)
          const totalPrice = await marketplace.getTotalPrice(item.itemId);

          const addressSeller = item.seller.slice(0, 5) + "..." + item.seller.slice(38, 42);
          // Add item to items array
        const detailItem = {
            totalPrice: totalPrice,
           
            itemId: item.itemId,
            seller: item.seller.toLowerCase(),
            addressSeller: addressSeller,
            name: metadata.title,
            description: metadata.description,
            image: metadata.image,
            sold: item.sold,
          };
          // }
      
        setItem(detailItem);
        console.log('item',item);
      };
      
      
  const buyMarketItem = async () => {
    try {
        setLoadingMsg('Loading buy item...');

      await (
        await marketplace.purchaseItem(item.itemId, { value: item.totalPrice})
      ).wait();
      // loadMarketplaceItems();
      setGlobalState('loading',{show: false})

    //   handleClickEvent();
    //   setLoadingPopUp(true);
    } catch (error) {
        setGlobalState('loading',{show: false})

    //   handleClickEvent();
    //         setLoadingPopUp(false);
    //         console.log('err buy', error);
    }
   
    
  };

      

     

      useEffect(() => {
        // if (account === null) {
        //   return;
        // }
    //     const getDetailItem = async () => {
    // await dispath(getProfileItem(itemId));
    //     }
        
    //     getDetailItem();
        loadMarketplaceItems();
        setGlobalState('nftId', itemId);
      }, []);
    
    return (
    <div className='flex flex-row justify-center items-center  '>
        <SetPrice marketplace={marketplace}/>
        <Loading/>
        <div className=' flex flex-col space-y-2'>
            <img src={item.image} alt='' className='border rounded p-10 h-[382px] w-[382px]'/>

            <div className='space-y-2 mt-2'>
                <h1 className='text-xl font-bold'>Description </h1>
                <p> {item.description}</p>
            </div>
            <div className='space-y-2'> 
                <h1 className='text-xl font-bold'>Detail</h1>
                <div className='flex justify-between'>
                    <span>Create</span>
                    <span>{item.addressSeller} </span>  
                </div>
                <div className='flex justify-between'>
                    <span>Owner</span>
                    <span>Alice</span>
                </div>
                <div className='flex justify-between'>
                    <span>Contract address</span>
                    <span>0x0000</span>
                </div>
            </div>
        </div>
        <div className=' flex flex-col mx-20 gap-2 '>
            <span className='text-3xl font-bold'> {item.name}</span>
            <span className='text-gray-700 text-sm '> NFT#{itemId}</span>
            <span className='text-2xl font-semibold  '>  ETH</span>
            {
                 account != item.seller  ? (
<button onClick={buyMarketItem} className='flex justify-center items-center w-full shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded p-2 mt-5'>
                   Buy Item
                </button>
                ):(
                    <button  onClick={() => {
                        setGlobalState('updateModal','scale-100');
                    }} className='flex justify-center items-center w-full shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded p-2 mt-5'>
                   Change Price
                </button>
                )
            }
            


        </div>

    </div>
  )
}

export default DetailNft