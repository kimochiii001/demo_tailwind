


import itemsReducer from '../features/ItemSlice';

import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';




const rootReducer = {
    items: itemsReducer,
    user: userReducer,
};

const store = configureStore({
    reducer: rootReducer,
})

export default store;