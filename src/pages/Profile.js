import React, { useEffect, useState } from "react";
import Items from "../components/Items";
import { ethers } from 'ethers';
const Profile = ({marketplace, nft, account}) => {

  const [copyText, setCopyText] = useState('');
  const [listItemSold, setListItemSold] = useState([]);

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
  useEffect(() => {
    if (account === null) {
      return;
    }
    // loadMarketplaceItemsOnSale();
    loadItemOwnerOf();
  }, []);
  return (
    <div>
      <div className="h-[227px] relative hover:bg-gray-500 bg-gray-100 rounded-b-lg">
        <div className="absolute -bottom-10 left-0 rounded-full border-2 w-[168px] h-[168px] bg-current">
          
        </div>
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
          <span>
                    {account.slice(0, 5) + "..." + account.slice(38, 42)}
                  </span>
        </div>
        <div>
          <p className="pb-10">Collection</p>

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
  );
};

export default Profile;
