

import { createGlobalState } from "react-hooks-global-state";

const {useGlobalState, setGlobalState, getGlobalState} = createGlobalState(
    {
        modal: 'scale-100',
        showModal: 'scale-0',
        updateModal: 'scale-0',
        loading: {show: false, msg:'Minting in progress'},
        nftId:'',
        connectedAccount:'',
        nft: null,
        nfts: [],
        transactions: [],
        contract: null
    }
)

const setLoadingMsg = (msg) => {
    // const loading = getGlobalState('loading');
    setGlobalState('loading', {show: true, msg})
}


const truncate = (text, startChars, endChars, maxLength) => {
    if(text.length > maxLength) {
        var start = text.substring(0, startChars);
        var end = text.substring(text.length -endChars, text.length);
        while(start.length + end.length < maxLength) {
            start = start + '.'
        }
        return start + end;
    }
    return text;
}

export {useGlobalState, setGlobalState, getGlobalState, setLoadingMsg, truncate}