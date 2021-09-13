import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../utils/helpers"
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';

function BannerItem(item) {
    const [state, dispatch] = useStoreContext();

    const {
        image,
        name,
        _id,
        price,
        quantity,
        size,
        customMessage
    } = item;

    const { cart } = state

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                banner: { ...item, purchaseQuantity: 1 }
            });
        }
    }

    return (
        <div className="card px-1 py-1">
            <Link to={`/banners/${_id}`}>
                <img
                    alt={name}
                    src={`/images/${image}`}
                />
                <p>{name}</p>
            </Link>
            <div>
                <div>{quantity} {pluralize("item", quantity)} in stock</div>
                <span>${price}</span>
            </div>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default BannerItem;