


import itemsReducer from '../features/ItemSlice';

import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import detailItemReducer from '../features/DetailItemSlice';
import walletReducer from '../features/wallet.reducer';




const rootReducer = {
    items: itemsReducer,
    user: userReducer,
    detailItem: detailItemReducer,
    wallet: walletReducer
};

const store = configureStore({
    reducer: rootReducer,
})

export default store;