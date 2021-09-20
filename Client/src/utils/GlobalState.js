import React, { createContext, useContext } from 'react';
import { useBannerReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

//instaniate init global state w/ useBannerReducer
const StoreProvider = ({ value = [], ...props }) => {
    //when useReducer runs returns state=current ver of GlobalState & dispatch=method to update state
    const [state, dispatch ] = useBannerReducer({
        banners: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    });

    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};
//custom react hook to receive state & dispatch data from storeProvider
const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext}