const db = require('./connection');
const { User, Banners, Size } = require('../models');

db.once('open', async () => {
    await Size.deleteMany();

    const Size = await Size.insertMany([
        { name: 'small-banner' },
        { name: 'medium-banner' },
        { name: 'larger-banner' }
    ])

    console.log('seeded the banner sizes');

    await Banner.deleteMany();

    const banners = await Banner.insertMAny([
        {
            name:'small-banner-example ',
            description:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
            image: 'insert-img',
            size: sizes[0]._id,
            price: 29.99,
            quantity: 1
        },
        {
            name:'medium-banner-example ',
            description:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
            image: 'insert-img',
            size: sizes[1]._id,
            price: 39.99,
            quantity: 1
        },
        {
            name:'large-banner-example ',
            description:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
            image: 'insert-img',
            size: sizes[2]._id,
            price: 89.99,
            quantity: 1
        },
    ]);
    console.log('you have seeded your example banners')
})