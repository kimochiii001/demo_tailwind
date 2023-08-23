
import React, { useState } from 'react'
import featuredMg from '../assets/featured-mug-01.jpg'
import { setGlobalState, setLoadingMsg, useGlobalState } from '../global';
import { ethers } from 'ethers';

const SetPrice = ({marketplace}) => {
    const [modal] = useGlobalState('updateModal');
    const [nftId] = useGlobalState('nftId');
    console.log('nft id', nftId);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [imageBase64, setImageBase64] = useState(null);



    const changePrice = async () => {
       try {
        setLoadingMsg('Loading set price item...');

        const newPriceV2 = ethers.utils.parseEther(price.toString());
        console.log(newPriceV2);
        await marketplace.change(nftId, newPriceV2);
        setGlobalState('updateModal','scale-0')
        
       } catch (error) {
        console.log('err change price', error);
        setGlobalState('loading',{show: false})

       }
       
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !description || !price) return;
        console.log('make...');

        resetForm();
    }

    const resetForm = () => {
        
        setPrice('');
        
    }

    const closeModal = () => {
        setGlobalState('loading',{show: false})


        // setGlobalState('showModal','scale-0')
        resetForm();
    }

    const closeModalSetPrice = () => {
        setGlobalState('updateModal','scale-0')
      
        resetForm();
    }

  return (
    <div  className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal} `}>
        <div className='bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            <div  className='flex flex-col'>
                <div className='flex justify-between items-center  text-gray-400 '>
                    <p className='font-semibold'>Set Price NFT {nftId.toString()}</p>
                    <button onClick={closeModalSetPrice} type='button' className='border-0 bg-transparent focus:outline-none' >
                        X
                    </button>
                </div>
                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 rounded-xl overflow-hidden h-20 w-20'>
                        <img className='h-full w-full object-cover cursor-pointer' src={ imageBase64 ||featuredMg} alt=''/>
                    </div>
                </div>
                <div  className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                <input className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 py-2 px-4 mr-4 bg-transparent border-0 ' type='number' 
                        placeholder='Price (ETH)'
                        min={0.01}
                        step={0.01}
                        name='price'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required/>
                </div>
                </div>
              
                
                <button onClick={changePrice} className='flex justify-center items-center w-full shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2 mt-5'>
                    Change Price
                </button>
            
               
            
        </div>
    </div>
  )
}

export default SetPrice