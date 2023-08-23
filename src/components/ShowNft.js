
import React, { useEffect, useState } from 'react'
import featuredMg from '../assets/featured-mug-01.jpg'
import { setGlobalState, useGlobalState } from '../global';

import { ethers } from 'ethers';

const ShowNft = ({nft, marketplace, account}) => {
    const [modal] = useGlobalState('showModal');
    const [nftId] = useGlobalState('nftId');
    const [items, setItems] = useState({});


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [imageBase64, setImageBase64] = useState(null);


const getDetailItemNft = async () => {

    try {
        const item = await marketplace.items(nftId);

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
  
        setItems(detailItem);
    } catch (error) {
        
    }

}

const buyMarketItem = async (item) => {
    try {
     
        await marketplace.purchaseItem(item.itemId, { value: item.totalPrice}).wait();
      // loadMarketplaceItems();

    //   handleClickEvent();
    //   setLoadingPopUp(true);
    } catch (error) {
    //   handleClickEvent();
    //         setLoadingPopUp(false);
            console.log('err buy', error);
    }
   
    
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !description || !price) return;
        console.log('make...');

        resetForm();
    }

    const resetForm = () => {
        setFileUrl('');
        setImageBase64(null);
        setTitle('');
        setPrice('');
        setDescription('');
    }

    const closeModal = () => {
        setGlobalState('showModal','scale-0')
        resetForm();
    }

    useEffect( () => {
         if (account) {
            // getDetailItemNft();
    }
    else
    {
        return
    }
        
    })

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal} `}>
        <div className='bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center  text-gray-400 '>
                    <p className='font-semibold'>View NFT</p>
                    <button onClick={closeModal} type='button' className='border-0 bg-transparent focus:outline-none' >
                        X
                    </button>
                </div>
                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 rounded-xl overflow-hidden h-40 w-40'>
                        <img className='h-full w-full object-cover cursor-pointer' src={ imageBase64 ||featuredMg} alt=''/>
                    </div>
                </div>
                <div className='flex flex-col justify-start rounded-xl mt-5'>
                    <h4 className='text-white font-semibold '>{items.name}</h4>
                    <p className='text-gray-400 text-xs my-1'></p>
                    <div className='flex flex-col justify-between'>
                        <div className='flex flex-col justify-center items-start'>
                                <small className='text-white font-bold'>@owner</small>
                                {/* <small className='text-pink-800 font-semibold'>{items.seller.slice(0, 5) + "..." + items.seller.slice(38, 42)}</small> */}
                                <small className='text-pink-800 font-semibold'>{items.seller}</small>

                        </div>
                        <div className='text-white flex flex-col justify-center'>
                        <small className='text-gray-400 font-bold'>Current price</small>
                        <small className='text-white font-bold'> { Number(items.totalPrice) } ETH</small>

                          
                        </div>

                    </div>
                </div>

                
{/* {
       account != nft.seller  ? (<button onClick={() => {
        setGlobalState('updateModal','scale-100')
   }} className='flex justify-center items-center w-full shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2 mt-5'>
       Change Price
   </button>) :(
          <button className='flex justify-center items-center w-full shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2 mt-5'>
          Buy Item
       </button>
        )
      } */}
                <div className='flex justify-center items-center space-x-2'>
                <button  className='flex justify-center items-center w-full shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2 mt-5'>
                   Buy Item
                </button>
                <button onClick={() => {
                     setGlobalState('updateModal','scale-100')
                }} className='flex justify-center items-center w-full shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2 mt-5'>
                    Change Price
                </button>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default ShowNft