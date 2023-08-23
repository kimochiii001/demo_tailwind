import React from 'react';
import featuredMg from '../assets/featured-mug-01.jpg';
import { setGlobalState } from '../global';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';


const ArtItem = ({nft , onBuy = true, onClick}) => {
 
  return (

      <div className=' w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3 cursor-pointer transform hover:-translate-y-2 transition duration-300'>
        <Link to={`/detailNft/${nft.itemId}`}>
        <img className='h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3' src={nft.image} alt='nft'/>
      <h4 className='text-white font-semibold'> {nft.name} </h4>
      <h4 className='text-white font-semibold'>     {nft.itemId}
   </h4>
  
      <p className='text-gray-400 text-sm my-1'> {nft.description}</p>
        </Link>
      
      <div className='flex justify-between items-center mt-3 text-white'>
          <div className='flex flex-col'>
              <small className='text-xs'>Current Price</small>
              <p className='text-sm font-semibold'>{ethers.utils.formatEther(nft.totalPrice)} ETH</p>
          </div>
         
         {
          onBuy && (
            <button
            onClick={onClick}
            // onClick={() => {
            //   setGlobalState('showModal','scale-100');
            //   setGlobalState('nftId',`${nft.itemId}`);
      
            //   }}
              
              className='shadow-lg shadow-black text-sm  bg-[#e32970] hover:bg-[#bd255f] rounded-full px-1.5 py-1'>Buy Item</button>
          )
         }
         
      </div>
  </div>
 
  )
}

export default ArtItem