import Tippy from "@tippyjs/react/headless";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Popper from "./Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { getItemList } from "../features/ItemSlice";
import { Search } from "@mui/icons-material";
import SearchItem from "./SearchItem";
import { ethers } from "ethers";


const Header = ({ web3Handler, account, balance }) => {
  const [onToggle, setOnToggle] = useState(false);
  const dispath = useDispatch();

  // const {walletAddress, balance} = useSelector(state => state.wallet);
  // console.log('walletAddress balance: ', walletAddress, balance);

const MENU_ITEM = [
  {
    icon: <FontAwesomeIcon icon={faUser}/>,
    title: "Profile",
    to:'/profile',
  },

  {
    icon: <FontAwesomeIcon icon={faLock}/>,
    title: "Profile" 
  },
  {
    icon: <FontAwesomeIcon icon={faChevronLeft}/>,
    title: "Profile" 
  }
]

  const handleToggle = () => {
    document.getElementById("top-menu").classList.toggle("hidden");
    document
      .getElementById("top-menu")
      .classList.toggle("ct-top-menu-expanded");
  };
  return (
    <div className="py-6 mx-auto  ">
      <nav className="flex flex-row justify-between relative">
        <div className="logo basis-1/6 text-center text-xl font-semibold cursor-pointer p-[12px]">
          NFT Market
        </div>
        <ul
          id="top-menu"
          className="basis-3/6  hidden lg:flex lg:justify-center lg:gap-8 font-medium uppercase text-sm text-gray-500 py-1"
        >
            <SearchItem/>
          
          <li className="ct-top-menu-item p-[12px]">
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#333" : "",
              })}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="ct-top-menu-item p-[12px]">
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#333" : "",
              })}
              to="/create"
            >
              Create
            </NavLink>
          </li>
          {/* <li className="ct-top-menu-item p-[12px]">
            <a href="#">My Listed Items</a>
          </li> */}
          {/* <li className="ct-top-menu-item p-[12px]">
            <a href="#">My Purchases</a>
          </li> */}
          {/* <li className='ct-top-menu-item'>
                <a href='#'>StyleGuide</a>
            </li> */}
        </ul>
        <button
          className="items-center basis-3/6 flex justify-end lg:hidden px-5 cursor-pointer"
          onClick={() => {
            handleToggle();
            // setOnToggle(!onToggle);
            // console.log(onToggle);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>

        <ul className="basis-0/6 font-semibold flex justify-end lg:justify-start uppercase text-sm items-center">
          <li className="">
            <a href="#" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ct-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <span className="mx-2">Card</span>
              {/* <span className='ct-badge-circle bg-red-400'>99+</span> */}
            </a>
          </li>
        </ul>

        {
          //href={`https://etherscan.io/address/${account}`
          account ? (
            <div className="basis-2/6 font-semibold  flex justify-center uppercase text-sm items-center ml-5 ">
              {/*                
               <span className='mx-2'>{
                   '10 ETH'
                   }</span>                    */}

              <div className=" border-2 border-transparent w-80%  rounded-xl flex items-center bg-dark-gray">
                <div className="flex p-[12px] rounded-l-xl hover:bg-gray-500 ">
                  <div>
                    <svg
                      className="ct-icon mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                    <span className="mr-2">{balance}</span>
                  </div>
                  <div className="w-0.5 h-5 bg-gray-400"></div>
                  <div>
                    <span className="mx-2">{"10 ETH"}</span>
                  </div>
                </div>

                <div className="w-0.5 h-12 bg-gray-400"></div>
               <Tippy 
               interactive
               placement="bottom"
               render={attrs => (
                <div className="w-[180px] mt-3 flex-col border-2 rounded-md bg-gray-100 items-start justify-start" tabIndex="-1" {...attrs}>
                 
                    <Link to="/profile" className="flex w-full items-center px-5 py-3 hover:bg-gray-400">
                    <FontAwesomeIcon className="mr-5" icon={faUser} />
                    <span className="">Profile</span>
                    </Link>
                    <button className="flex w-full items-center px-5 py-3  hover:bg-gray-400">
                    <FontAwesomeIcon className="mr-5" icon={faUser} />
                    <span className="">Setting</span>
                    </button>
                    <button className="flex w-full items-center px-5 py-3  hover:bg-gray-400">
                    <FontAwesomeIcon className="mr-5" icon={faLock} />
                    <span className="">Log Out</span>
                    </button>

                 
                </div>
              )}
               >
                
                    <div  className="mx-2">
                      <span>
                        {account.slice(0, 5) + "..." + account.slice(38, 42)}
                      </span>
                    </div>
                 
               </Tippy>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {web3Handler().then(async () =>{
                await dispath(getItemList());
              })}}
              className="asis-0/6 font-semibold  flex justify-start uppercase text-sm items-center ml-5"
            >
              Connect Wallet
            </button>
          )
        }
      </nav>
    </div>
  );
};

export default Header;
