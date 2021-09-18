import React, {useEffect} from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState.js';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
// import { QUERY_CHECKOUT } from '../../utils/queries';
// import { useLazyQuery } from '@apollo/client';

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    //const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, banners: [...cart] });
        };

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    //calculate total of everything saved in state.cart
    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const bannerIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                bannerIds.push(item._id);
            }
        });

        // getCheckout({
        //     variables: { banners: bannerIds }
        // });
    }

    if (!state.cartOpen) {
        return (
            <div className='cart-closed' onClick={toggleCart}>
                <span
                role='img'
                aria-label='trash'>🛒</span>
            </div>
        );
    }

    return (
        <div className="cart">
        <div className="close" onClick={toggleCart}>[close]</div>
        <h2>Shopping Cart</h2>
        {state.cart.length ? (
            <div>
                {state.cart.map(item => (
                    <CartItem key={item._id} item={item} />
                ))}

                <div className="flex-row space-between">
                    <strong>Total: ${calculateTotal()}</strong>

                    {
                        Auth.loggedIn() ?
                            <button onClick={submitCheckout}>
                                Checkout
                            </button>
                            :
                            <span>(log in to check out)</span>
                    }
                </div>
            </div>
        ) : (
                <h3>
                    You haven't added anything to your cart yet!
                </h3>
            )}
    </div>
);
};

export default Cart;