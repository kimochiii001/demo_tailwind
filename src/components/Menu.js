
import React from 'react'

const Menu = ({children, items = []}) => {
  return (
    <Tippy 
    interactive
    placement="bottom"
    render={attrs => (
     <div className="w-[180px] mt-3 flex-col border-2 rounded-md bg-gray-100 items-start justify-start" tabIndex="-1" {...attrs}>
      
         

      
     </div>
   )}
    >
     
         {children}
    </Tippy>
  )
}

export default Menu