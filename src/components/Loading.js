import React from 'react'
import Spinner from 'react-spinner-material'
import { useGlobalState } from '../global'

const Loading = () => {
  const [loading] = useGlobalState('loading');
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center  bg-black bg-opacity-50 transform transition-transform duration-300 ${loading.show ? 'scale-100' : 'scale-0'}`}> 
    <div className='bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl min-w-min px-10 pb-2'>
        <div className='flex flex-col text-white'>
            <div className='flex  justify-center items-center '>
            <Spinner className='my-5 mr-5'  radius={40} color={"#ccc"} stroke={5} visible={true}/>
              <p className='text-lg'>{loading.msg}</p>
            </div>

        </div>
        </div > 
        </div>
  )
}

export default Loading