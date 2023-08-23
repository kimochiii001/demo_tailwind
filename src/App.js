import logo from './logo.svg';
import Create from './pages/Create';
import Home from './pages/Home';
// import './App.css';
import {ethers} from 'ethers';
import { publicRoutes } from './routes';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {marketplace, nft} from './contract/contract';



import DefaultLayout from './layout/DefaultLayout';
import Header from './components/Header';
// const {Web3} = require('web3');
import Web3Modal from 'web3modal';
import DetailItem from './components/DetailItem';
import Profile from './pages/Profile';
import { getUser } from './features/userSlice';
import { getItemList } from './features/ItemSlice';
import { setWalletInfo } from './features/wallet.reducer';
import Spinner from 'react-spinner-material';
import UploadNFT from './components/UploadNFT';
import { useGlobalState } from './global';
import DetailNft from './components/DetailNft';
import { loadBlockchain } from './features/connectionSlice';
const rpcURL = 'https://rpc.ankr.com/fantom_testnet';
function App() {
  

  const marketplaceABI = require("./marketplace-abi.json");
  const nftABI = require("./nft-abi.json");
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(null)

  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({});
  const [getSigner, setGetSigner] = useState(null);
//0xD5125c091a7c2f04132b66C20D5afA12E481E90F
  const marketplaceAddress ='0x4733A7B0c61975fA5Aa73C54259DaE332275fee7';
  const NFTAddress ='0x3A3A6bd75466c58fd822682eAe5E80f770EcE458';

  // const userId = useSelector(state => state.user.current);
  const {contractNFT,contractMarketplace} = useSelector(state => state.connectContract);
console.log('contract connect', contractNFT, contractMarketplace);

  const dispath = useDispatch();
  // console.log('userId', userId);
  const handleConnectUser = async () => {
    await dispath(getUser()).then( async() => {
      await dispath(getItemList())
    });
  }

  // const [account, setaccount] = useState('');

  // const connectMetaMask = async () => {
  //   web3Handler().then( async() => {
  //     await dispath(getItemList())
  //   });
  // }


//   const web3Handler = async () => {

    

//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     // setaccount(accounts[0]);
//     let walletInfo = {
//       walletAddress:accounts[0],
//       balance: 0
//     }
//     if(accounts) {
      
// const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// const signer = provider.getSigner();
// const getCurrentAccount = signer.getAddress();
// console.log('Current account:',(await getCurrentAccount).toString());
// const balance = await provider.getBalance(walletInfo.walletAddress);


// walletInfo.balance = ethers.utils.formatEther(balance);
//     }
//     dispath(setWalletInfo(walletInfo));
 
  
//     // loadContracts(signer);
    

//   }
 

const [connectedAccount] = useGlobalState('connectedAccount');


const connectDapp = async () => {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  setAccount(accounts[0]);
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  const getCurrentAccount = signer.getAddress();
  // console.log('Current account:',(await getCurrentAccount).toString());
  const balance = await provider.getBalance(getCurrentAccount);
  setBalance(ethers.utils.formatEther(balance));
  dispath(loadBlockchain() );

  // loadContracts(signer);

  } catch (error) {
    
  }
  
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

  
  

  // useEffect( () => {
   
  // isWalletConnected().then(() => {
  //   loadContracts(signer);
  // });
  // },);
  



useEffect(() => {
  if (!window.ethereum) {
    // Nothing to do here... no ethereum provider found
    return;
  }

  if(!account) {
  dispath(loadBlockchain() );

  }
  const accountWasChanged = (accounts) => {
    setAccount(accounts[0]);
    console.log('accountWasChanged');
  }
  const getAndSetAccount = async () => {
    const changedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(changedAccounts[0]);
    console.log('getAndSetAccount');
  }
  const clearAccount = () => {
    setAccount('');
    console.log('clearAccount');
  };
  window.ethereum.on('accountsChanged', accountWasChanged);
  window.ethereum.on('connect', getAndSetAccount);
  window.ethereum.on('disconnect', clearAccount);
  // window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
  //   console.log('accounts', accounts);
  //   setAccount(accounts[0])
  //   // No need to set account here, it will be set by the event listener
  // }, error => {
  //   // Handle any UI for errors here, e.g. network error, rejected request, etc.
  //   // Set state as needed 
  // })
  // return () => {
  //   // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
  //   window.ethereum.off('accountsChanged', accountWasChanged);
  //   window.ethereum.off('connect', getAndSetAccount);
  //   window.ethereum.off('disconnect', clearAccount);
  // }
}, []);
 

  return (
  
    <Router>
      <div className="App max-w-screen-2xl text text-base mx-auto px-8  font-Karla">
        
        <Header web3Handler={connectDapp}  account={account} balance={balance} />
        {
          !account ? (
            <div className='flex justify-center item-center h-[80px] my-60'>
              <Spinner radius={60} color={"#333"} stroke={2} visible={true}/>
              <p className='mx-10 py-3'>Awaiting MetaMask Connection</p>

            </div>
          ) : (
            <Routes>      
            <Route path='/' element={<Home marketplace={contractMarketplace} nft={contractNFT} account={account} />}></Route>
            <Route path='/create' element={<Create marketplace={contractMarketplace} nft={contractNFT}/>}></Route>
            <Route path='/detailNft/:itemId' element={<DetailNft marketplace={contractMarketplace} nft={contractNFT} account={account}/>}></Route>
  
            <Route path='/profile' element={<Profile marketplace={contractMarketplace} nft={contractNFT} account={account}/>}></Route>
            <Route path='/uploadNft' element={<UploadNFT marketplace={contractMarketplace} nft={contractNFT} />}></Route>
  
  
          </Routes>
          )
        }
       
      
      </div>
    </Router>
  );
}

export default App;
