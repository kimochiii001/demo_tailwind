


import React from 'react'
import Header from '../components/Header'

const DefaultLayout = ({children}) => {
  return (
    <div className='max-w-screen-2xl text text-base mx-auto px-8  font-Karla'>
        <Header/>

       
        {
            children
        }
       
      

    </div>
  )
}

export default DefaultLayout