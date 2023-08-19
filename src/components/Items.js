import React, { useState } from 'react'
import featuredMg from '../assets/featured-mug-01.jpg'
import { Link } from 'react-router-dom';
import { marketplace } from '../contract/contract';
import { useDispatch, useSelector } from 'react-redux';
import { getItemList } from '../features/ItemSlice';
import {ethers} from 'ethers';
import { IconButton, Snackbar } from '@mui/material';
import { ClosedCaption } from '@mui/icons-material';
import SnackBarPopup from './SnackBarPopup';
import SnackBarSuccess from './SnackBarSuccess';

//style={{ backgroundImage: `url(${featuredMg})`}}
const Items = ({item, onBuy = false, account, onClick, OnClose, open = false, loading}) => {

    // const [title, setTitle] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [open, setOpen] = useState(false);
    // const {walletAddress, balance} = useSelector(state => state.wallet);
    // console.log('walletAddress balance: ', walletAddress, balance);
    // const handleToClose = (event, reason) => {
    //     if ("clickaway" == reason) return;
    //     setOpen(false);
    // };
 
    // const handleClickEvent = () => {
    //     setOpen(true);
    // };
    // const buyMarketItem = async (item) => {
    //     try {
            
    //         await (
    //             await marketplace.purchaseItem(item.itemId, { value: item.totalPrice})
    //           ).wait();
    //           handleClickEvent();
    //           setLoading(true);
    //     } catch (error) {
           
    //         handleClickEvent();
    //         setLoading(false);
    //         setTitle('ban da reject');
    //         console.log('reject', error);
    //     }
        

      
        
    //   };
      const dispath = useDispatch();
  return (
    
      
<div className=''>


{
        loading === true ? (<div>
          <SnackBarSuccess title={'ban da mua thanh cong'} OnSB={open} OnClose={OnClose}/>
        </div>) :(
          <SnackBarPopup title={'ban da reject'} OnSB={open} OnClose={OnClose}/>
        )
      }
   <div className='h-[340px] border-2 border-coffee-400 '  >
    

                
         

    <div className='group w-full h-full relative hover:bg-gray-900 hover:bg-opacity-20  '>
    <Link to={`/detailItem/${item.itemId.toString()}`} >
    <img src={featuredMg} className='w-full h-full bg-no-repeat bg-cover'/>
      
      {
!item.sold ? (
  <div className=' absolute w-[100px] bg-white text-center  py-2 px-4 top-2 right-2 font-medium text-coffee-400'>Sold</div> ) : (
<div className=' absolute w-[100px] bg-white text-center  py-2 px-4 top-2 right-2 font-medium text-coffee-400'>On Sale</div> 
  )
      }
    
        </Link> 

        {/* {
            onBuy &&  <button  onClick={() => {
                buyMarketItem(item);
                       }
                          
                       
                       } className=' hidden group-hover:block absolute bottom-2 w-11/12 left-1/2 -translate-x-1/2 bg-white text-center  py-2 px-4 bottom-2 tracking-wide font-medium'>BUY FOR</button>

                       
        } */}

{
       account.toLowerCase() != item.seller.toLowerCase()  ? (<div>
          <button  onClick={onClick
                          
                       
                       } className=' hidden group-hover:block absolute bottom-2 w-11/12 left-1/2 -translate-x-1/2 bg-white text-center  py-2 px-4 bottom-2 tracking-wide font-medium'>BUY FOR</button>
        </div>) :(
          <div className=' hidden group-hover:block absolute bottom-2 w-11/12 left-1/2 -translate-x-1/2 bg-white text-center  py-2 px-4 bottom-2 tracking-wide font-medium'>Owner</div>
        )
      }


       
    </div>

</div>

<div className='text-center py-5'>
<a href='#' className=''>
    <div className='uppercase font-medium hover:opacity-80 mb-2'>{item.name}</div>
</a>

<div>
    
    <span className='ml-2  text-gray-400'>{ethers.utils.formatEther(item.totalPrice)} </span>
    <span className='text-coffee-400 font-medium'> ETH</span>
    

</div>

<span className='text-coffee-400 font-medium'>SELLER: {item.seller.slice(0,5)}</span>
{/* <span className='text-coffee-400 font-medium'>owner: {walletAddress.slice(0,5)}</span> */}


</div>
        </div>
        
    
  

  )
}

export default Items