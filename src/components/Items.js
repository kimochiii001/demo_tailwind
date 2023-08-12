import React from 'react'
import featuredMg from '../assets/featured-mug-01.jpg'
//style={{ backgroundImage: `url(${featuredMg})`}}
const Items = ({item}) => {
  return (
  <div className=''>
   <div className='h-[340px] border-2 border-coffee-400 '  >
    

                
         
<a href='#'>
    <div className='group w-full h-full relative hover:bg-gray-900 hover:bg-opacity-20  '>
    <img src={featuredMg} className='w-full h-full bg-no-repeat bg-cover'/>
        <div className=' absolute w-[100px] bg-white text-center  py-2 px-4 top-2 right-2 font-medium text-coffee-400'>On Sale</div>

        <button  className=' hidden group-hover:block absolute bottom-2 w-11/12 left-1/2 -translate-x-1/2 bg-white text-center  py-2 px-4 bottom-2 tracking-wide font-medium'>BUY FOR</button>
    </div>
</a> 
</div>

<div className='text-center py-5'>
<a href='#' className=''>
    <div className='uppercase font-medium hover:opacity-80 mb-2'>fgf</div>
</a>

<div>
    <span className='text-coffee-400 font-medium'> ETH</span>
    <span className='ml-2 line-through text-gray-400'>$99.00 USD </span>
</div>
</div>
        </div>

  )
}

export default Items