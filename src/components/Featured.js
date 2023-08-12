import React, { useEffect, useState } from 'react'


import featuredMg from '../assets/featured-mug-01.jpg'
import { ethers } from 'ethers';

const Featured = ({marketplace, nft}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMarketplaceItems = async () =>{
        const itemCount = await marketplace.itemCount();
        let items = [];
        for(let i =0;i<itemCount;i++){
            const item = await marketplace.Items(i);
            if(!item.sold){
                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId);
                //use uri to fetch the nft metadata stored on ipfs
                const response = await fetch(uri);
                const metadata = await response.json();
                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(item.itemId);
                // add item to items array
                items.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                });
                setItems(items);
                setLoading(false);
            }
        }
    }

    const buyMarketItem = async (item) =>{
        await(await marketplace.purchaseItem(item.itemId, {value: item.totalPrice})).wait();
        loadMarketplaceItems();
    }

    useEffect(() =>{
        loadMarketplaceItems();
    },[])

    // if(loading) return(
    //     <main   style={{padding:"1rem 0"}}>
    //         <h2>Loading...</h2>
    //     </main>
    // )
  return (
   <div></div>
    
  )
}

export default Featured