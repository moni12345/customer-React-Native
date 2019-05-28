import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import rootReducer from './reducers'

import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

// const store = createStore(rootReducer,applyMiddleware(thunk,logger))
// store.getState((state)=>console.log(state,'this is what '))
// export default store

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer,applyMiddleware(thunk,logger));
export const persistor = persistStore(store);