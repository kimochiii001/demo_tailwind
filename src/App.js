import logo from './logo.svg';
import Create from './pages/Create';
import Home from './pages/Home';
// import './App.css';
import {ethers} from 'ethers';
import { publicRoutes } from './routes';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';



import DefaultLayout from './layout/DefaultLayout';
import Header from './components/Header';
// const {Web3} = require('web3');
import Web3Modal from 'web3modal';
import DetailItem from './components/DetailItem';
import Profile from './pages/Profile';
import { getUser } from './features/userSlice';
const rpcURL = 'https://rpc.ankr.com/fantom_testnet';
function App() {
  

  const marketplaceABI = require("./marketplace-abi.json");
  const nftABI = require("./nft-abi.json");
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({});
  const [getSigner, setGetSigner] = useState(null);
//  const web3 = new Web3(rpcURL);
  // const marketplaceAddress ='0x7531F454fB9e36787389eC2A65ca564A9F2a9A39';
  // const NFTAddress ='0x84e5d7574E1c192Fa79B91ba1Fa87D0E50D692a6';
  //   const marketplaceAddress ='0xbA546d8D596330976e3c7109E30f592903963C88';
  // const NFTAddress ='0xAA5aE60917D8CF726ebdBBDB71f68184c5575F34';
  const marketplaceAddress ='0xBEa6c10c63D6c0256Cb4e70039Cfa40A247A3448';
  const NFTAddress ='0x3A3A6bd75466c58fd822682eAe5E80f770EcE458';

  const userId = useSelector(state => state.user.current);
  const dispath = useDispatch();
  console.log('userId', userId);
  const handleConnectUser =  () => {
    dispath(getUser());
  }

  const web3Handler = async () => {
 

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
  

    // Get provider from Metamask
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
      // const provider = new ethers.providers.JsonRpcProvider(rpcURL);
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

      // const connectedWallet = wallet.connect(provider);
    // Set signer
    const signer = provider.getSigner();
    // console.log(signer);
    // const address = await signer.getAddress();

  
    loadContracts(signer);
    

  }
 

  
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer)
    setMarketplace(marketplace);
    console.log(marketplace);

    const nft = new ethers.Contract(NFTAddress, nftABI, signer);
    console.log(nft);
    setNFT(nft);
    setLoading(false);
  }

 

  return (
  
    <Router>
      <div className="App max-w-screen-2xl text text-base mx-auto px-8  font-Karla">
        <Header web3Handler={handleConnectUser} account={userId}/>
        <Routes>      
          <Route path='/' element={<Home marketplace={marketplace} nft={nft} account={userId} />}></Route>
          <Route path='/create' element={<Create marketplace={marketplace} nft={nft}/>}></Route>
          <Route path='/detailItem/:itemId' element={<DetailItem marketplace={marketplace} nft={nft} account={account}/>}></Route>

          <Route path='/profile' element={<Profile marketplace={marketplace} nft={nft} account={account}/>}></Route>


        </Routes>
      
      </div>
    </Router>
  );
}

export default App;
