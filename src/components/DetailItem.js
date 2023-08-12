import React, { useEffect, useState } from "react";
import featuredMg from "../assets/featured-mug-01.jpg";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";


const DetailItem = ({marketplace, nft, account}) => {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState({});
  const [sold, setSold] = useState([]);
  const [price, setPrice] = useState(null);

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    console.log(`ITEM COUNT: ${itemCount}`);
    
  

      const item = await marketplace.items(itemId);
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
    const items01 = {
        totalPrice: totalPrice,
       
        itemId: item.itemId,
        seller: item.seller,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        sold: item.sold,
      };
      // }
    
    setLoading(false);
    setItems(items01);
    console.log(items);
  };

  const editPriceItem = async () => {
    const listingPrice = ethers.utils.parseEther(price.toString());
  console.log(listingPrice);
  console.log(itemId);
  
  await(await marketplace.changePriceItem(itemId, listingPrice)).wait();
  }

  useEffect(() => {
    if (account === null) {
      return;
    }
    loadMarketplaceItems();
  }, []);

  return (
    <div className="w-[80%] mx-auto my-20  flex">
      <div className="h-[340px] w-[400px]">
        <img
          src={featuredMg}
          className="w-full h-full bg-no-repeat bg-cover"
        ></img>
      </div>
      <div className="ml-10 flex flex-col item-center justify-center ">
        <p>Id sản phẩm: {itemId}</p>
        <p>Tên sản phẩm: {items.name}</p>
        {/* <p>Giá sản phẩm: {items.totalPrice}</p> */}
        {/* <p>Giá:  {ethers.utils.formatEther(items.totalPrice)} ETH</p> */}
        <input onChange={(e) => {setPrice(e.target.value);
        console.log(price);
        }}  type='number' className='border-2   py-2 px-2' placeholder='Price...' ></input>
        <button onClick={editPriceItem} className='border-2   py-2 px-2 my-10'>EDIT PRICE</button>
      </div>
    </div>
  );
};

export default DetailItem;
