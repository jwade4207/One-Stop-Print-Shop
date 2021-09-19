import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_BANNER } from "../utils/queries";
import { idbPromise } from '../utils/helpers';
//import spinner from "../assets/spinner.gif";
import Cart from "../components/Cart";
import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_BANNER,
} from "../utils/actions";

function Detail() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentBanner, setCurrentBanner] = useState({});

    const { loading, data } = useQuery(QUERY_BANNER);

    const { banners, cart } = state;

    const addToCart = () => {

        const itemInCart = cart.find((cartItem) => cartItem._id === id);

        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                banner: { ...currentBanner, purchaseQuantity: 1 },
            });
            // if banner isn't in the cart yet, add it to the current shopping cart in IndexedDB
            idbPromise('cart', 'put', { ...currentBanner, purchaseQuantity: 1 });
        }
    }


    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentBanner._id,
        });
        // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
        idbPromise('cart', 'delete', { ...currentBanner });
    };

    useEffect(() => {
        //Global Store
        if (banners.length) {
            setCurrentBanner(banners.find((banner) => banner._id === id));
        } else if (data) {
            dispatch({
                type: UPDATE_BANNER,
                banners: data.banners,
            });
            data.products.forEach((banner) => {
                idbPromise('banners', 'put', banner);
            });
        }
        // get cache from idb
        else if (!loading) {
            idbPromise('banners', 'get').then((indexedBanners) => {
                dispatch({
                    type: UPDATE_BANNER,
                    products: indexedBanners
                });
            });
        }
    }, [banners, data, loading, dispatch, id]);

    return (
        <>
            {currentBanner ? (
                <div className="container my-1">
                    <Link to="/">← Back to Banners</Link>

                    <h2>{currentBanner.name}</h2>

                    <p>{currentBanner.description}</p>

                    <p>
                        <strong>Price:</strong>${currentBanner.price}{" "}
                        <button onClick={addToCart}></button>
                        <button
                            disabled={!cart.find((p) => p._id === currentBanner._id)}
                            onClick={removeFromCart}
                        >
                            Remove from Cart
                        </button>
                    </p>

                    <img
                        src={`/images/${currentBanner.image}`}
                        alt={currentBanner.name}
                    />
                </div>
            ) : null}
            {loading ? <img src={''} alt="loading" /> : null}
            <Cart />
        </>
    );
}

export default Detail;
