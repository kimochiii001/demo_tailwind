


import itemsReducer from '../features/ItemSlice';

import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import detailItemReducer from '../features/DetailItemSlice';
import walletReducer from '../features/wallet.reducer';
import connectionReducer from '../features/connectionSlice';




const rootReducer = {
    items: itemsReducer,
    user: userReducer,
    detailItem: detailItemReducer,
    wallet: walletReducer,
    connectContract : connectionReducer
};

const store = configureStore({
    reducer: rootReducer,
})

export default store;