

import React, { useState } from 'react';
import {create as ipfsHttpClient} from 'ipfs-http-client';
// const ipfsClient = require("ipfs-http-client");
import { ethers } from 'ethers';
import { Buffer } from 'buffer';
import Tippy from '@tippyjs/react/headless';
import SnackBarPopup from '../components/SnackBarPopup';
import SnackBarSuccess from '../components/SnackBarSuccess';

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
// const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

// const client = ipfsHttpClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https',  headers: {
//   authorization:
//     '2SaoJGathTM74sxbYFnt10wq9AE',
// }, })

const projectId = '2OdM18NSh1dijfz4i42B7zat4wq';
const projectSecret = 'b1d224681d5e870b09f87a28a22355a0';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  // apiPath: '/api/v0',
  headers: {
    authorization: auth,
  }
})

const Create = ({marketplace, nft}) => {

  const [idItem, setIdItem] = useState(null);
  const [priceV2, setPriceV2] = useState(null);
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState(null);
const [image, setImage] = useState('');
const [price, setPrice] = useState(null);
const [name, setName] = useState('');
const [description, setDescription] = useState('');

const[loading, setLoading] = useState(false);
const[onSB, setOnSB] = useState(false);


const [listItemSold, setListItemSold] = useState([]);

// const uploadToIPFS = async (e) =>{
//   e.preventDefault();
//   const file = e.target.files[0];
//   if(typeof file !== 'undefined') {
//     try {
//       const result =  await client.add(file);
//       console.log(result);
//       setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
//     } catch (error) {
//       console.log("ipfs image upload error: ", error);
//     }
//   }
// }
const uploadToIPFS = async (event) => {
  event.preventDefault()
  const file = event.target.files[0]
  if (typeof file !== 'undefined') {
    try {
      const result = await client.add(file)
      console.log(result)
      setImage(`https://5ire-icon.infura-ipfs.io/${result.path}`)
    } catch (error){
      console.log("ipfs image upload error: ", error)
    }
  }
}


const createNFT = async () => {
  if (!image || !price || !name || !description) return
  try{
    const result = await client.add(JSON.stringify({image, price, name, description}));
    console.log(result);
    const uri = `https://ipfs.io/ipfs/${result.path}`;
    console.log(uri);
    await(await nft.mint(uri)).wait();
  } catch(error) {
    console.log("ipfs uri upload error: ", error)
  }
}

const checkFeeAccount = async () => {
  const account = await marketplace.feeAccount();

  console.log(account.toString());
}

const createItem = async () => {
  if (!image || !price || !name || !description) return
  try{
    const result = await client.add(JSON.stringify({image, price, name, description}));
    console.log(result);
    mintThenList(result);
    setLoading(true);
  
    console.log('loading', loading);
     
  } catch(error) {
    console.log("ipfs uri upload error: ", error);
    setLoading(false);
    console.log('false', loading);

   
  }
}

const checkBalancesOf = async () => {
   const balanceCheck =  await nft.balanceOf(address);
   setBalance(balanceCheck.toString());
   console.log(balance);
}

const checkDetailItem = async () =>{
  const detailItem = await marketplace.items(idItem);
  console.log(`Detail Item ${detailItem}`);
}

const cancellItemMarket = async () =>{
  await marketplace.cancellItem(idItem);
}

const showAllItemOnSale = async () =>{
  const listItem =  await marketplace.getAllNftsOnSale();
  console.log(listItem.toString());
}

const changePriceV2 = async () => {
  console.log(`maket ${marketplace}`);
  const newPriceV2 = ethers.utils.parseEther(priceV2.toString());
  console.log(newPriceV2);
  await marketplace.change(idItem, newPriceV2);
}
const formatBalance = (rawBalance) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}
const tupleToObject = (tuple) => {
  return {
      itemId: tuple[0],
      nft: tuple[1],
      price: tuple[2],
      seller: tuple[3],
      sold: tuple[4],
      status: tuple[5],
      tokenId: tuple[6],

  };
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
     
      itemId: item[i].itemId,
      seller: item[i].seller,
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
      sold: item[i].sold,});    
  }
  console.log(items);
  setListItemSold(items);
  console.log(listItemSold);
 
};

const loadItemOwnerOf = async () => {
  
  let items = [];

  const item = await marketplace.getItemOwnerOf();
 
  

  for (let i = 0; i < item.length; i++) {
  //   console.log(item[i].itemId);
  // console.log(item[i].nft);

  
    console.log(`sold ${item[i].seller}`);
    // get uri url from nft contract
    const uri = await nft.tokenURI(item[i].tokenId);
    // use uri to fetch the nft metadata stored on ipfs
    const response = await fetch(uri);
    const metadata = await response.json();
    // get total price of item (item price + fee)
    const totalPrice = await marketplace.getTotalPrice(item[i].itemId);

    items.push({
      totalPrice,
     
      itemId: item[i].itemId,
      seller: item[i].seller,
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
      sold: item[i].sold,});    
  }
  console.log(items);
  setListItemSold(items);
  console.log(listItemSold);
 
};
const mintThenList = async (result) => {

  try {
    const uri = `https://ipfs.io/ipfs/${result.path}`;
    console.log(uri);
  
  //  const balancesOwner = await formatBalance(nft.balanceOf(addressOwner));
  //  console.log(`banlance ${balancesOwner}`);
    // mint nft 
    await(await nft.mint(uri)).wait();
  
    // get tokenId of new nft 
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    console.log(listingPrice);
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait();
    setLoading(true);
  setOnSB(true);
    console.log('loading', loading);
  } catch (error) {
    console.log('reject', error);
    setLoading(false);
    setOnSB(true);
    console.log('false', loading);
  }
 
}

const onPopUpErr = () =>{
  setOnSB(!onSB);
  setLoading(false)
  console.log(onSB);
}
const onPopUpSuss = () =>{
  setOnSB(!onSB);
  setLoading(true)
  console.log(onSB);
}
  
const handleToClose = (event, reason) => {
  if ("clickaway" == reason) return;
  setOnSB(false);
};

  return (
    
    <div className='w-[80%] mx-auto my-20  '>

      {
        loading === true ? (<div>
          <SnackBarSuccess title={'suss'} OnSB={onSB} OnClose={handleToClose}/>
        </div>) :(
          <SnackBarPopup title={'error'} OnSB={onSB} OnClose={handleToClose} />
        )
      }
    
    {/* <SnackBarSuccess title={'error'} OnSB={onSB} OnClose={handleToClose}/> */}
      <div className='flex justify-center items-center mb-20 font-medium'>
            <div className='w-5 h-px bg-gray-400'></div>
            <div className='mx-2 uppercase tracking-wide'> CREATE NFT</div>
            <div className='w-5 h-px bg-gray-400'></div>
        
        
    </div>
    <div className='bg-gray-100 text-center py-20'>
    <div className='mb-10'>
      
        <input className='border-2 w-1/2'    type="file"
                required
                name="file"
                onChange={uploadToIPFS} ></input>
      </div>
      <div className='mb-10'>
       
        <input onChange={(e) =>setName(e.target.value)} value={name}    type='text' className='border-2  w-1/2 py-2 px-2' placeholder='Name...' ></input>
      </div>

      <div className='mb-10'>
       
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='border-2  w-1/2 py-2 px-2' placeholder='Description...'></textarea>
       
      </div>
      <div className='mb-10'>
       
        <input onChange={(e) => setPrice(e.target.value)} value={price}  type='number' className='border-2  w-1/2 py-2 px-2' placeholder='Price in ETH...' ></input>
      </div>
      <div>
       <button onClick={onPopUpErr} className='border-2 w-1/2 py-2 mb-5 uppercase bg-coffee-400 font-medium'>POP UP</button>
       <button onClick={onPopUpSuss} className='border-2 w-1/2 py-2 mb-5 uppercase bg-coffee-400 font-medium'>POP UP</button>
      </div>
      <div>
        <button onClick={createItem} className='border-2 w-1/2 mb-10 py-2 uppercase bg-coffee-400 font-medium'>createItem</button>
      </div>
      
      <input
                    type="text"
                    placeholder="Address"
                   onChange={(e) =>{setAddress(e.target.value);
                    console.log(address);
                  
                  
                  }}
                   className='border-2  w-1/2 py-2 px-2'
                   value={address} />
                
      <div>
        <button onClick={checkBalancesOf} className='border-2 w-1/2 mb-10 py-2 uppercase bg-coffee-400 font-medium'>Check</button>
      </div>
      <p>{balance}</p>
      <input
                    type="text"
                    placeholder="set price..."
                   onChange={(e) =>{setPriceV2(e.target.value);
                    console.log(priceV2);
                  
                  
                  }}
                   className='border-2  w-1/2 py-2 px-2'
                   value={priceV2} />
                   <input
                    type="text"
                    placeholder="id Item..."
                   onChange={(e) =>{setIdItem(e.target.value);
                    console.log(idItem);
                  
                  
                  }}
                   className='border-2  w-1/2 py-2 px-2'
                   value={idItem} />
                   <div>
        <button onClick={changePriceV2} className='border-2 w-1/2 mb-10 py-2 uppercase bg-coffee-400 font-medium'>SET PRICE</button>
      </div>
      <input
                    type="text"
                    placeholder="id Item..."
                   onChange={(e) =>{setIdItem(e.target.value);
                    console.log(idItem);
                  
                  
                  }}
                   className='border-2  w-1/2 py-2 px-2'
                   value={idItem} />
                   <div>
        <button onClick={cancellItemMarket} className='border-2 w-1/2 mb-10 py-2 uppercase bg-coffee-400 font-medium'> CANCELL ITEM</button>

        <button onClick={checkDetailItem} className='border-2 w-1/2 mb-10 py-2 uppercase bg-coffee-400 font-medium'> CHECK DETAIL ITEM</button>

        <button onClick={showAllItemOnSale} className='border-2 w-1/2 mb-10 py-2 uppercase bg-coffee-400 font-medium'> CHECK all ITEM on sale</button>
        <button onClick={loadMarketplaceItemsOnSale} className='border-2 w-1/2 mb-10 py-2 uppercase bg-coffee-400 font-medium'> CHECK all ITEM on Array</button>
        <button onClick={loadItemOwnerOf} className='border-2 w-1/2 mb-10 py-2 uppercase bg-coffee-400 font-medium'> CHECK all ITEM Owner Of</button>

        <div className="grid grid-rows-1 lg:grid-cols-4   gap-4">
          {listItemSold.length > 0 ? (
            <div className="">
              {listItemSold.map((item, idx) => (
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
                        
                          <button
                            
                            className=" hidden group-hover:block absolute bottom-2 w-11/12 left-1/2 -translate-x-1/2 bg-white text-center  py-2 px-4 bottom-2 tracking-wide font-medium"
                          >
                            BUY FOR
                          </button>
                        
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
            <p>ko co sp</p>
          )}
        </div>
      </div>
    </div>
     
    </div>
  )
}

export default Create