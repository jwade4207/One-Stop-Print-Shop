const db = require('./connection');
const { User, Banner } = require('../models');

db.once('open', async () => {
    // await Size.deleteMany();

    // const Size = await Size.insertMany([
    //     { name: 'small-banner' },
    //     { name: 'medium-banner' },
    //     { name: 'larger-banner' }
    // ])

    // console.log('seeded the banner sizes');

    await Banner.deleteMany();

    const banners = await Banner.insertMany([
        {
            name:'small-banner-example ',
            // customMessage:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
            image: 'insert-img',
            price: 29.99,
            quantity: 1
        },
        {
            name:'medium-banner-example ',
            // customMessage:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
            image: 'insert-img',
            price: 39.99,
            quantity: 1
        },
        {
            name:'large-banner-example ',
            // customMessage:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
            image: 'insert-img',
            price: 89.99,
            quantity: 1
        },
    ]);
    console.log('you have seeded your example banners')

    
    await User.deleteMany();

    await User.create({
      firstName: 'Pamela',
      lastName: 'Washington',
      email: 'pamela@testmail.com',
      password: 'password12345',
      orders: [
        {
          banners: [banners[0]._id, banners[0]._id, banners[1]._id]
        }
      ]
    });
  
    await User.create({
      firstName: 'Elijah',
      lastName: 'Holt',
      email: 'eholt@testmail.com',
      password: 'password12345'
    });
  
    console.log('users seeded');
  
    process.exit();
  });