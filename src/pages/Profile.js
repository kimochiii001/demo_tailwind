import React, { useEffect, useState } from "react";
import Items from "../components/Items";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { getItemListOwnerOf } from "../features/ItemSlice";
import { Link } from "react-router-dom";
const Profile = ({ marketplace, nft, account }) => {
  // const itemListOwner = useSelector(state => state.items.items);
  // const itemList = useSelector(state => state.items.items);
  // console.log('itemsOwner', itemList);
  // const dispath = useDispatch();
  const [copyText, setCopyText] = useState("");
  const [listItem, setListItem] = useState([]);
  const [soldItem, setSoldItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItemOwnerOf = async () => {

    try {
      const item = await marketplace.getItemOwnerOf();
      let items = [];
      // const uri = await nft.tokenURI(item[2].tokenId);
      // console.log('item owner uri 2', uri);
      // console.log('item owner of 2', item[2]);

      
        //  let soldItems = [];
  
    for (let i = 0; i < item.length; i++) {
      console.log('item owner', item[i]);

        // get uri url from nft contract
      const uri = await nft.tokenURI(item[i].tokenId);
      // use uri to fetch the nft metadata stored on ipfs
      const response = await fetch(uri);
      const metadata = await response.json();
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(item[i].itemId);
      
      const priceFinal = ethers.utils.formatEther(totalPrice);


         items.push({
        totalPrice,
       
        itemId: item[i].itemId,
        seller: item[i].seller,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        sold: item[i].sold,});    
  
    
    }

    setListItem(items);
    setLoading(false);
  
   
  
   
  
    
     
    
    } catch (error) {
      console.log('err',error);
    }
   
  };

  useEffect(() => {
    loadItemOwnerOf();
  }, []);

  if (loading)
    return (
      <div>
        <div className="h-[227px] relative hover:bg-gray-500 bg-gray-100 rounded-b-lg">
          <div className="absolute -bottom-10 left-0 rounded-full border-2 w-[168px] h-[168px] bg-current"></div>
        </div>
        <div className="h-[40px]"></div>
        <div>
        <p>unnamed</p>
        <div className="flex py-3">
          <svg
            className="ct-icon mx-2"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
          </svg>
          <span>{account.slice(0, 5) + "..." + account.slice(38, 42)}</span>
        </div>
        <div>
          <p className="pb-10">Collection</p>

          <div className="">
            <h2> Loading ... </h2>
          </div>
        </div>
      </div>
      </div>
    );
  return (
    <div>
      <div className="h-[227px] relative hover:bg-gray-500 bg-gray-100 rounded-b-lg">
        <div className="absolute -bottom-10 left-0 rounded-full border-2 w-[168px] h-[168px] bg-current"></div>
      </div>
      <div className="h-[40px]"></div>
      <div>
        <p>unnamed</p>
        <div className="flex py-3">
          <svg
            className="ct-icon mx-2"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
          </svg>
          <span>{account.slice(0, 5) + "..." + account.slice(38, 42)}</span>
        </div>
        <div>
          <p className="pb-10">Collection</p>

          <div className="">
            {listItem.length > 0 ? (
              <div className="grid grid-rows-1 lg:grid-cols-4   gap-4">
                {listItem.map((item, idx) => (
                  <Items item={item} key={idx}  account={account} />
                ))}
              </div>
            ) : (
              <p>ko co sp</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
