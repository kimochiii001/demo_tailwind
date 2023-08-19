import React from 'react'

const ButtonItem = ({title}) => {
  return (
    <button className="flex w-full items-center px-5 py-3 hover:bg-gray-400">
                    <FontAwesomeIcon className="mr-5" icon={faUser} />
                    <span className="">Profile</span>
                    </button>
  )
}

export default ButtonItem