import React, { useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import { useMutation } from "@apollo/react-hooks";
import { idbPromise } from "../utils/helpers";
import { ADD_ORDER } from "../utils/mutations";

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const banners = cart.map(item => item._id);

            if (banners.length) {
                const { data } = await addOrder({ variables: { banners } });
                const bannerData = data.addOrder.banners;

                bannerData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
            }

            setTimeout(() => {
                window.location.assign('/');
            }, 3000);
        }

        saveOrder();
    }, [addOrder]);

    return (
        <div>
            <Jumbotron>
                <h1>Success!</h1>
                <h2>Thank you for your purchase!</h2>
                <h2>You will now be redirected to the homepage</h2>
            </Jumbotron>
        </div>
    );
}

export default Success;