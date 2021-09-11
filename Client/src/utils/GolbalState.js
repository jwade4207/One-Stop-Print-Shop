import React, { createContext, useContext } from 'react';
import { useBannerReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch ] = useBannerReducer({
        banners: [],
        cart: [],
        cartOpen: false,
    });

    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContxt = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContxt}