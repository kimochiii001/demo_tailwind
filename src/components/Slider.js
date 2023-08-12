import React from 'react'

import sliderBg from '../assets/slider-bg.jpeg';

const Slider = () => {
  return (
    <div className=' h-[530px] bg-cover bg-no-repeat bg-bottom' style={{ backgroundImage: `url(${sliderBg})`}}  >
    
        <div className=' h-full w-full flex justify-center items-center bg-gray-900 bg-opacity-40'>
          <div className='text-white text-center'>
            <div className='uppercase  mb-6'>BEST PLACE TO BUY COFFEE</div>
            <div className='text-5xl font-medium mb-6'>Coffee Mugs</div>
            <div className='mb-6 font-bold'>The most versatile furniture system ever created. Designed to fit your life, made to move and grow.</div>
            <div className='flex justify-center'>
              <div className=' bg-white text-black uppercase w-max py-4 px-6 tracking-wide cursor-pointer font-medium hover:bg-gray-100'>EXPLORE OUR PRODUCTS</div>
            </div>

          </div>
        </div>
       

    </div>
  )
}

export default Slider