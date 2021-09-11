import React from 'react';
import Cart from '../components/Cart';

//need to decide on category/banners
const Home = () => {
    return (
        <div className="container">
            <CategoryMenu />
            <Banners/>
            <Cart />
        </div>
    );
};

export default Home;