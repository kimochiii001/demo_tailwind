import React, { useEffect, useState } from "react";
import featuredMg from "../assets/featured-mug-01.jpg";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { getProfileItem } from "../features/DetailItemSlice";
import SnackBarSuccess from "./SnackBarSuccess";
import SnackBarPopup from "./SnackBarPopup";



const DetailItem = ({marketplace, nft, account}) => {
  const {walletAddress, balance} = useSelector(state => state.wallet);

  const detail= useSelector(state => state.detailItem.item);
  const dispath = useDispatch();
  console.log('detailItem', detail);
  const { itemId } = useParams();
  const [items, setItems] = useState({});
  const [sold, setSold] = useState([]);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
};

const handleClickEvent = () => {
    setOpen(true);
};

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


  const changePriceV2 = async () => {
    try {
      console.log(`maket ${marketplace}`);
      const newPriceV2 = ethers.utils.parseEther(price.toString());
      console.log(newPriceV2);
      await marketplace.change(itemId, newPriceV2);
      await dispath(getProfileItem(itemId));
      handleClickEvent();
      setLoading(true);
    } catch (error) {
      console.log('error change price', error);
      handleClickEvent();
      setLoading(false);
    }
   
  }
  useEffect(() => {
    // if (account === null) {
    //   return;
    // }
    const getDetailItem = async () => {
await dispath(getProfileItem(itemId));
    }
    
    getDetailItem();
    // loadMarketplaceItems();
  }, []);

  return (
    
    <div className="w-[80%] mx-auto my-20  flex">
      {
        loading === true ? (<div>
          <SnackBarSuccess title={'ban da mua thanh cong'} OnSB={open} OnClose={handleToClose}/>
        </div>) :(
          <SnackBarPopup title={'reject'} OnSB={open} OnClose={handleToClose}/>
        )
      }
      <div className="h-[340px] w-[400px]">
        <img
          src={detail.image}
          className="w-full h-full bg-no-repeat bg-cover"
        ></img>
      </div>
      <div className="ml-10 flex flex-col item-center justify-center ">
        <p>Id: {itemId}</p>
        <p>Name: {detail.name} </p>
        <p>Total Price: {detail.priceFinal} ETH </p>
 <p>Description: {detail.description}
 </p>
 <p>Description: {detail.seller}
 </p>



 {/* {
       walletAddress.toLowerCase() != detail.seller.toLowerCase()  ? (
          <div className=' hidden group-hover:block absolute bottom-2 w-11/12 left-1/2 -translate-x-1/2 bg-white text-center  py-2 px-4 bottom-2 tracking-wide font-medium'> Not Owner</div> 
       ) :(
         

          <div>
             
          </div>
        )
      } */}
      <p>Set Price:
 </p>
            <input onChange={(e) => {setPrice(e.target.value);
        console.log(price);
        }}  type='number' className='border-2   py-2 px-2' placeholder='Price...' ></input>
        <button onClick={changePriceV2} className='border-2   py-2 px-2 my-10'>EDIT PRICE</button>
          
      
            
        
      </div>
    </div>
  );
};

export default DetailItem;
