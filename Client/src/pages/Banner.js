
import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import BannerItem from '../pages/BannerItem';
//import { Form, DropdownButton, InputGroup, Dropdown, Container, Row, Col, Button, FormControl } from "react-bootstrap";
import { useStoreContext } from '../utils/GlobalState';
import { QUERY_BANNER } from '../utils/queries';
import { UPDATE_BANNER } from "../utils/actions";

import { idbPromise } from '../utils/helpers';
import spinner from '../assets/images/spinner.gif';


function Banner() {

    const [ state, dispatch ] = useStoreContext();
    const { currentCategory } = state;
    const { loading, data } = useQuery(QUERY_BANNER);

    useEffect(() => {
        //if there is date to be stored
        if (data) {
            //store it in GlobalState object
            dispatch({
                type: UPDATE_BANNER,
                banner: data.banners
            });
            //also save ea banner to IndexedDB using helper function
            data.banners.forEach((banner) => {
                idbPromise('banner', 'put', banner);
            })
            // add else if to check if `loading` is undefined in `useQuery()` Hook
        } else if (!loading) {
            // if we're offline, get all of the data from the `banners` store
            idbPromise('banner', 'get').then((banner) => {
                // use retrieved data to set global state for offline browsing
                dispatch({
                    type: UPDATE_BANNER,
                    banners: banner
                });
            });
        }
    }, [data, loading, dispatch]);

    function filterBanners() {
        if (!currentCategory) {
            return state.banners;
        }
    
        return state.banners.filter(banner => banner.category._id === currentCategory);
    }

    return (
        <div className="my-2 banner-container">
            <h2>Our Banners:</h2>
            { state.banners.length ? (
                <>
                    <div className="flex-row">
                  { filterBanners().filter(b => {
                    return b.image.startsWith("Banner") == false
                  }).map((banner) => (
                      <BannerItem
                      key={banner._id}
                      _id={banner._id}
                      image={banner.image}
                      name={banner.name}
                      price={banner.price}
                      quantity={banner.quantity}
                      />
                  )) }
                </div>
                  <div className="flex-row">
                  { filterBanners().filter(b => {
                    return b.image.startsWith("Banner")
                  }).map((banner) => (
                      <BannerItem
                      key={banner._id}
                      _id={banner._id}
                      image={banner.image}
                      name={banner.name}
                      price={banner.price}
                      quantity={banner.quantity}
                      />
                  ))}
                  </div>
              </>
            ) : (
                <h3>You haven't added any banners yet!</h3>
            )
            }
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
    );
}

export default Banner;
