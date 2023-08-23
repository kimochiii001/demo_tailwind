

import React from 'react';
import featuredMg from '../assets/featured-mug-01.jpg';
import { useGlobalState } from '../global';


const ArtWork = ({children}) => {

    const [nfts] = useGlobalState('nfts');
  return (
    <div className=' '>
        <div className='py-10 mx-auto'>
            <h4 className=' text-3xl font-bold uppercase  '> Artworks </h4>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5'>

           
                    {children}


           
           
        </div>
    </div>
  )
}

const Card = ({nft}) =>(
    <div className='w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3'>
        <img className='h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3' src={featuredMg} alt='nft'/>
        <h4 className='text-white font-semibold'> NFT</h4>
        <p className='text-gray-400 text-sm my-1'> loremx</p>
        <div className='flex justify-between items-center mt-3 text-white'>
            <div className='flex flex-col'>
                <small className='text-xs'>Current Price</small>
                <p className='text-sm font-semibold'>0.3 ETH</p>
            </div>
            <button className='shadow-lg shadow-black text-sm  bg-[#e32970] hover:bg-[#bd255f] rounded-full px-1.5 py-1'>Buy Item</button>
        </div>
    </div>
)

export default ArtWork