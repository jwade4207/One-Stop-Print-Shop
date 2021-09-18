import { useReducer } from 'react'
//CART FUNCTION
import {
    UPDATE_BANNER,
    ADD_TO_CART,
    //ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from './actions.js';

export const reducer = (state, action) => {
    switch (action.type) {
        //if action type value is the value of `UPDATE_BANNERS`, return a new state object with an updated banners array
        case UPDATE_BANNER:
            return {
                ...state,
                banners: [...action.banner],
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.banner]
            };
        // case ADD_MULTIPLE_TO_CART:
        //     return {
        //         ...state,
        //         cart: [...state.cart, ...action.banner],
        //     };
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(banner => {
                return banner._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(banner => {
                    if (action._id === banner._id) {
                        banner.purchaseQuantity = action.purchaseQuantity;
                    }
                    return banner;
                })
            };
            case CLEAR_CART:
                return {
                    ...state,
                    cartOpen: false,
                    cart: []
                };
            case TOGGLE_CART:
                return {
                    ...state,
                    cartOpen: !state.cartOpen
                };
        // if it's none of these actions, do not update state at all and keep things the same!
        default:
            return state;
    }
};

export function useBannerReducer(initialState) {
    return useReducer(reducer, initialState);
}

