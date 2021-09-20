const db = require('./connection');
const { User, Banner, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Pre-Made' },
    { name: 'Custom' }
  ]);

  console.log('categories seeded');

  await Banner.deleteMany();

  const banners = await Banner.insertMany([
    {
      name:'Happy Birthday',
      // customMessage:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
      image: 'Birthday.png',
      category: categories[0]._id,
      price: 29.99,
      quantity: 1
    }, 
    {
      name:'Congratulations',
      // customMessage:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
      image: 'graduation.png',
      category: categories[0]._id,
      price: 29.99,
      quantity: 1
    },
    {
      name:'Happy Anniversary',
      // customMessage:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
      image: 'Anniversary.png',
      category: categories[0]._id,
      price: 29.99,
      quantity: 1
    },
    {
      name:'small-banner-example ',
      // customMessage:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
      image: 'BannerSM.png',
      category: categories[1]._id,
      price: 29.99,
      quantity: 1
      },
      {
        name:'medium-banner-example ',
        // customMessage:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
        image: 'BannerMD.png',
        category: categories[1]._id,
        price: 39.99,
        quantity: 1
      },
      {
        name:'large-banner-example ',
        // customMessage:'this is a examply im just pluggin in right now and we can change later, but will have the layout for the 3 different sizes',
        image: 'BannerLG.png',
        category: categories[1]._id,
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