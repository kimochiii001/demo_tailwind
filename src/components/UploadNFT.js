

import React, { useState } from 'react'
import featuredMg from '../assets/featured-mug-01.jpg'
import { setGlobalState, setLoadingMsg, useGlobalState } from '../global';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import { Buffer } from 'buffer';
import Loading from './Loading';
import { getAllNftsOnSales, minNFT } from '../service/Blockchain';
import { ethers } from 'ethers';
import SnackBarSuccess from './SnackBarSuccess';
import SnackBarPopup from './SnackBarPopup';



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


const UploadNFT = ({nft, marketplace}) => {
    const [modal] = useGlobalState('modal');
    const[loading, setLoading] = useState(false);
    const[onSB, setOnSB] = useState(false);
    const[image,setImage] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [imageBase64, setImageBase64] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!fileUrl || !title || !description || !price) return;


        try {

            const created = client.add(fileUrl);
            // const created = await client.add(JSON.stringify({fileUrl, price, title, description}));
        // setLoadingMsg('Uploaded, approve transaction now ...');

            const metadataURI = `https://ipfs.io/ipfs/${created.path}`;
            // await minNFT(metadataURI);
            getAllNftsOnSales();

        // await createItem();

       
           

        } catch (error) {
            console.log('err mint', error);
        }

    }

    // const createNFT = async () => {
    //     if(!fileUrl || !title || !description || !price) return;
    //     // setLoadingMsg('Uploading to IPFS an create NFT...');

    //     try{
    //         const result = await client.add(JSON.stringify({fileUrl, price, title, description}));

    //         const metadataURI = `https://ipfs.io/ipfs/${result.path}`;
    //                 // const nft = {title, description, price, metadataURI};
    //                 console.log(metadataURI);
    //                 await(await nft.mint(metadataURI)).wait();
    //     } catch(error) {
    //       console.log("ipfs uri upload error: ", error)
    //     }
    //   }
      
    const createItem = async (e) => {
        e.preventDefault();
        if (!fileUrl || !price || !title || !description) return
        setLoadingMsg('setApprovalForAll Item...');
        const imageResult = await client.add(fileUrl)
        
        try{
            // setLoadingMsg('approve transaction...');
            // const metaUri = {
            //   fileUrl: fileUrl,
            //   price: price,
            //   title: title,
            //   description: description
            // }

          const result = await client.add(JSON.stringify({image: `https://ipfs.io/ipfs/${imageResult.path}`, price, title, description}));
          console.log(result);
          mintThenList(result);
          setLoading(true);
  
          console.log('loading', loading);

           
        } catch(error) {
          console.log("ipfs uri upload error: ", error);
   
          setLoading(false);
          console.log('false', loading);
          setGlobalState('loading',{show: false})

         
        }
      }

      const mintThenList = async (result) => {


        try {

          const uri = `https://ipfs.io/ipfs/${result.path}`;
          console.log('uri',uri);
        
       
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
          resetForm();

            console.log('loading', loading);
          setGlobalState('loading',{show: false})
     
        } catch (error) {
          console.log('reject', error);
          setLoading(false);
          setOnSB(true);
          console.log('false', loading);
          setGlobalState('loading',{show: false})

        }
       
      }
      

    const changeImage = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

        reader.onload = (readerEvent) => {
            const file = readerEvent.target.result;
            setImageBase64(file);
            setFileUrl(e.target.files[0]);
        }

        console.log(fileUrl);
    }

    const resetForm = () => {
        // setFileUrl('');
        setImageBase64(null);
        setTitle('');
        setPrice('');
        setDescription('');
    }

    const closeModal = () => {
        setGlobalState('modal','scale-0')
        resetForm();
    }

    const handleToClose = (event, reason) => {
        if ("clickaway" == reason) return;
        setOnSB(false);
      };

  return (
    <div className={` flex items-center justify-center pt-10  `}>

{
        loading === true ? (<div>
          <SnackBarSuccess title={'suss'} OnSB={onSB} OnClose={handleToClose}/>
        </div>) :(
          <SnackBarPopup title={'error'} OnSB={onSB} OnClose={handleToClose} />
        )
      }
        <Loading/>
        <div className='bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            <form onSubmit={createItem} className='flex flex-col'>
                <div className='flex justify-between items-center  text-gray-400 '>
                    <p className='font-semibold'>Add NFT</p>
                    {/* <button onClick={closeModal} type='button' className='border-0 bg-transparent focus:outline-none' >
                        X
                    </button> */}
                </div>

                <div className='flex flex-row'>
                    
                </div>
                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 rounded-xl overflow-hidden h-40 w-40'>
                        <img className='h-full w-full object-cover cursor-pointer' src={ imageBase64 ||featuredMg} alt=''/>
                    </div>
                </div>
                <div  className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                    <label className='block'>
                        <span className='sr-only'>Choose Profile Photo</span>
                        <input className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-[#1d2631] focus:outline-none cursor-pointer focus:ring-0' type='file' accept='image/png, image/gif, image/jpeg, image/jpg, image/webp' 
                        onChange={changeImage}
                        required/>
                    </label>
                </div>
                <div  className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                <input className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 py-2 px-4 mr-4 bg-transparent border-0 ' type='text' 
                        placeholder='Title'
                        name='title'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required/>
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
                <div  className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                <textarea className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 py-2 px-4 mr-4 bg-transparent border-0 h-20 resize-none' type='text' 
                        placeholder='Description'
                        name='description'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required/>
                </div>
                <button className='flex justify-center items-center  shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2 mt-5'>
                    Make Item
                </button>
            </form>
        </div>
    </div>
  )
}

export default UploadNFT