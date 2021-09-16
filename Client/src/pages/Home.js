import React from 'react';
import Cart from '../components/Cart';
import Banner from '../pages/Banner';
//need to decide on category/banners
const Home = () => {
    return (
        <div className="container">
            {/*<CategoryMenu />*/}
            <Banner/> 
            <Cart />
        </div>
    );
};

export default Home;