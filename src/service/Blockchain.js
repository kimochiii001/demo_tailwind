


const { ethers, errors } = require("ethers");
const marketplaceABI = require("../marketplace-abi.json");
const nftABI = require("../nft-abi.json");
const { getGlobalState, setGlobalState } = require("../global");


const marketplaceAddress ='0x20689856Bf449019D6ecF879b638D95Fc75eA559';
const NFTAddress ='0x3A3A6bd75466c58fd822682eAe5E80f770EcE458';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const signer = provider.getSigner();

// const chainId = 4002;


const getEthereumContractNft  = async () => {
    const connectAccount = getGlobalState('connectedAccount');

    if(connectAccount) {
        const nft = new ethers.Contract(NFTAddress, nftABI, signer);
        console.log(nft);
        return nft;
    }
    else
    {
        return getGlobalState('contract');
    }
}

const getEthereumContractMarket  = async () => {
    const connectAccount = getGlobalState('connectedAccount');

    if(connectAccount) {
        const market = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);
        console.log(market);
        return market;
    }
    else
    {
        return getGlobalState('contract');
    }
}

const minNFT = async (uri) =>{
    try {
        const contractNft = await getEthereumContractNft();
        // await contractNft
        console.log('contract nft', contractNft);

        await contractNft.mint(uri).wait();

        return true;

    } catch (error) {
        console.log('err mint', error);
    }
}

const getAllNftsOnSales = async () => {
    try {
        const contractMarket = await getEthereumContractMarket();
        const contractNft = await getEthereumContractNft();
        // await contractNft
        console.log('contract market', contractMarket);

        let items = [];
  
        const item = await contractMarket.getAllNftsOnSale();
        console.log('all nft', item);
      
        for (let i = 0; i < item.length; i++) {
        
          const uri = await contractNft.tokenURI(item[i].tokenId);
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response.json();
          // get total price of item (item price + fee)
          const totalPrice = await contractMarket.getTotalPrice(item[i].itemId);
      
          const itemSale = ({
            totalPrice,
           
            itemId: item[i].itemId,
            seller: item[i].seller,
            name: metadata.title,
            description: metadata.description,
            image: metadata.fileUrl,
            sold: item[i].sold});    

            setGlobalState('nfts', itemSale);
        }

        
   
    


    } catch (error) {
        
    }
} 

// const structuredNfts = (nfts) => {
//     nfts.map((nft) => ({
//         id: Number(nft.itemId),
//         price: ethers.utils.formatEther(nft.totalPrice),
//         seller: nft.seller.toLowerCase(),
//         name: metadata.title,
//         description: metadata.description,
//          image: metadata.fileUrl,
//         sold: nft.sold,


//     }))
// }

const connectWallet =  async () => {
    try {
        if(!window.ethereum) return alert('please install MetaMask');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setGlobalState('connectedAccount', accounts[0].toLowerCase());

    } catch (error) {
        console.log('err connect',error);
    }
}

const isWalletConnected = async () => {
    try {
        if(!window.ethereum) return alert('please install MetaMask');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        window.ethereum.on('chainChanged', async (chainId) => {
            window.location.reload();
        })

        window.ethereum.on('accountsChanged', async () => {
            setGlobalState('connectedAccount', accounts[0].toLowerCase());
            await isWalletConnected();
        })

        if(accounts.length) {
            setGlobalState('connectedAccount', accounts[0].toLowerCase());

        }
        else {
            alert('Please connect wallet');
            console.log('No accounts found');
        }
    } catch (error) {
        
    }
}

export {connectWallet, isWalletConnected, minNFT, getAllNftsOnSales}