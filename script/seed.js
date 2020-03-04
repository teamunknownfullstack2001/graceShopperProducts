'use strict'

const {green, red} = require('chalk')
const db = require('../server/db')
const {User, Product, Order, orderProduct, Tag} = require('../server/db/models')

const users = [
  {
    userName: 'Alric Venners',
    email: 'avenners0@businessweek.com',
    password: 'CzXV0m8',
    salt: null,
    googleId: null,
    stripeId: null,
    type: 'admin',
    address: '1352 Gulseth Parkway, New York, NY',
    zip: '10001',
    phone: '703-457-2792'
  },
  {
    userName: 'Sharline Croney',
    email: 'scroney1@state.tx.us',
    password: 'gFXBSSV1',
    salt: null,
    googleId: null,
    stripeId: null,
    address: '9452 Rieder Way, San Francisco, CA',
    zip: '90210',
    phone: '567-970-1143'
  },
  {
    userName: 'Moshe Btham',
    email: 'mbtham2@angelfire.com',
    password: 'JxmEPQKq0JW4',
    salt: null,
    googleId: null,
    stripeId: null,
    address: '5734 Dapin Place, Englewood, FL',
    zip: '34223',
    phone: '529-336-3251'
  },
  {
    userName: 'Frederica Muffen',
    email: 'fmuffen3@japanpost.jp',
    password: 'NOFv1iBo',
    salt: null,
    googleId: null,
    stripeId: null,
    address: '5 Mccormick Crossing, Montville, NJ',
    zip: '07045',
    phone: '298-412-5928'
  },
  {
    userName: 'Jerry Kleis',
    email: 'jkleis4@google.fr',
    password: 'Drc5fO2',
    salt: null,
    googleId: null,
    stripeId: null,
    address: '990 Blackbird Avenue, Denver, CO',
    zip: '80014',
    phone: '650-764-6969'
  },
  {
    userName: 'Morey Cunniffe',
    email: 'mcunniffe5@who.int',
    password: 'vs99rzUHHP',
    salt: null,
    googleId: null,
    stripeId: null,
    address: '0 Columbus Center, New York, NY',
    zip: '10016',
    phone: '581-323-2900'
  },
  {
    userName: 'Ameline Andrieu',
    email: 'aandrieu6@google.es',
    password: 'jHm15tU',
    salt: null,
    googleId: null,
    stripeId: null,
    address: '7832 Gateway Junction, Las Vegas, NV',
    zip: '88901',
    phone: '100-845-9393'
  },
  {
    userName: 'Courtenay Heald',
    email: 'cheald7@meetup.com',
    password: 'aRlDbxDYsFD',
    salt: null,
    googleId: null,
    stripeId: null,
    address: '724 Coolidge Hill, Richmond, VA',
    zip: '23713',
    phone: '795-984-3609'
  },
  {
    userName: 'Emlynn Birtwell',
    email: 'ebirtwell8@storify.com',
    password: 'M0oDOqBw4e',
    salt: null,
    googleId: null,
    stripeId: null,
    address: '106 Monterey Point, Detroit, MI',
    zip: '48127',
    phone: '775-369-1751'
  },
  {
    userName: 'Kayle Carlisle',
    email: 'kcarlisle9@fotki.com',
    password: 'NERY7QB2pRqy',
    salt: null,
    googleId: null,
    stripeId: null,
    address: '35 Di Loreto Place, Providence, RI',
    zip: '02860',
    phone: '523-678-1359'
  }
]

const products = [
  {
    name: 'tincidunt in leo',
    category: 'Runner',
    description:
      'rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
    price: 306.12,
    stock: 75
  },
  {
    name: 'donec',
    category: 'Square',
    description:
      'luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec',
    price: 133.69,
    stock: 37
  },
  {
    name: 'nulla sed accumsan',
    category: 'Area',
    description:
      'rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis',
    price: 264.66,
    stock: 45
  },
  {
    name: 'ut',
    category: 'Round',
    description:
      'pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras',
    price: 968.45,
    stock: 37
  },
  {
    name: 'erat',
    category: 'Square',
    description:
      'morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis',
    price: 382.8,
    stock: 76
  },
  {
    name: 'phasellus sit amet',
    category: 'Oval',
    description:
      'etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis',
    price: 514.43,
    stock: 100
  },
  {
    name: 'ut mauris eget',
    category: 'Oval',
    description:
      'ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est',
    price: 678.94,
    stock: 94
  },
  {
    name: 'cum sociis',
    category: 'Square',
    description:
      'augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea',
    price: 142.58,
    stock: 14
  },
  {
    name: 'nulla suscipit',
    category: 'Square',
    description:
      'tortor duis mattis egestas metus aenean fermentum donec ut mauris',
    price: 890.37,
    stock: 29
  },
  {
    name: 'vehicula condimentum',
    category: 'Square',
    description:
      'turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus',
    price: 78.21,
    stock: 68
  },
  {
    name: 'erat quisque erat',
    category: 'Runner',
    description:
      'nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu',
    price: 957.23,
    stock: 53
  },
  {
    name: 'et',
    category: 'Square',
    description:
      'integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices',
    price: 735.5,
    stock: 87
  },
  {
    name: 'nulla et accumsan',
    category: 'Area',
    description:
      'magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum',
    price: 619.34,
    stock: 43
  },
  {
    name: 'mus vivamus',
    category: 'Oval',
    description: 'non mi integer ac neque duis bibendum morbi non quam nec dui',
    price: 535.42,
    stock: 78
  },
  {
    name: 'sed tristique',
    category: 'Square',
    description:
      'nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue',
    price: 955.03,
    stock: 14
  },
  {
    name: 'arcu adipiscing molestie',
    category: 'Square',
    description:
      'donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla',
    price: 606.52,
    stock: 36
  },
  {
    name: 'auctor',
    category: 'Runner',
    description:
      'et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin',
    price: 709.47,
    stock: 21
  },
  {
    name: 'massa volutpat',
    category: 'Area',
    description:
      'scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor',
    price: 824.64,
    stock: 24
  },
  {
    name: 'cubilia curae nulla',
    category: 'Square',
    description:
      'luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi',
    price: 776.1,
    stock: 63
  },
  {
    name: 'sed magna at',
    category: 'Area',
    description:
      'tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia',
    price: 433.08,
    stock: 41
  },
  {
    name: 'consectetuer adipiscing',
    category: 'Square',
    description:
      'morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus',
    price: 621.11,
    stock: 59
  },
  {
    name: 'sapien iaculis congue',
    category: 'Square',
    description:
      'enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis',
    price: 205.72,
    stock: 42
  },
  {
    name: 'tincidunt',
    category: 'Square',
    description:
      'vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum',
    price: 67.75,
    stock: 24
  },
  {
    name: 'augue a',
    category: 'Square',
    description:
      'quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum',
    price: 862.48,
    stock: 66
  },
  {
    name: 'suscipit a',
    category: 'Area',
    description:
      'morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla',
    price: 481.72,
    stock: 96
  },
  {
    name: 'enim blandit',
    category: 'Runner',
    description:
      'quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis',
    price: 787.62,
    stock: 72
  },
  {
    name: 'luctus',
    category: 'Oval',
    description:
      'non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa',
    price: 516.79,
    stock: 68
  },
  {
    name: 'vitae',
    category: 'Round',
    description:
      'tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc',
    price: 644.19,
    stock: 1
  },
  {
    name: 'at diam',
    category: 'Square',
    description:
      'nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo',
    price: 725.08,
    stock: 63
  },
  {
    name: 'lobortis ligula sit',
    category: 'Round',
    description:
      'pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien',
    price: 480.56,
    stock: 54
  },
  {
    name: 'ultrices',
    category: 'Area',
    description: 'a odio in hac habitasse platea dictumst maecenas ut massa',
    price: 317.7,
    stock: 25
  },
  {
    name: 'vel augue vestibulum',
    category: 'Runner',
    description:
      'turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam',
    price: 391.47,
    stock: 1
  },
  {
    name: 'id massa id',
    category: 'Octagon',
    description:
      'congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo',
    price: 835.03,
    stock: 7
  },
  {
    name: 'ipsum ac tellus',
    category: 'Runner',
    description:
      'nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel',
    price: 904.61,
    stock: 79
  },
  {
    name: 'sit',
    category: 'Square',
    description:
      'nec nisi volutpat eleifend donec ut dolor morbi vel lectus in',
    price: 499.82,
    stock: 75
  },
  {
    name: 'pellentesque',
    category: 'Oval',
    description:
      'eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus',
    price: 65.11,
    stock: 7
  },
  {
    name: 'sociis natoque',
    category: 'Oval',
    description:
      'amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis',
    price: 804.18,
    stock: 37
  },
  {
    name: 'in sagittis dui',
    category: 'Area',
    description:
      'non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing',
    price: 142.11,
    stock: 52
  },
  {
    name: 'convallis nulla',
    category: 'Square',
    description:
      'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh',
    price: 972.9,
    stock: 93
  },
  {
    name: 'volutpat',
    category: 'Runner',
    description:
      'proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio',
    price: 344.23,
    stock: 5
  },
  {
    name: 'ipsum primis',
    category: 'Round',
    description:
      'posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis',
    price: 388.87,
    stock: 19
  },
  {
    name: 'nulla justo aliquam',
    category: 'Octagon',
    description:
      'porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec',
    price: 792.68,
    stock: 7
  },
  {
    name: 'cras non velit',
    category: 'Runner',
    description:
      'sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet',
    price: 529.05,
    stock: 18
  },
  {
    name: 'vestibulum ac',
    category: 'Square',
    description:
      'donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a',
    price: 106.32,
    stock: 62
  },
  {
    name: 'elit sodales',
    category: 'Octagon',
    description:
      'hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque',
    price: 874.42,
    stock: 87
  },
  {
    name: 'ornare',
    category: 'Square',
    description:
      'quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh',
    price: 509.59,
    stock: 18
  },
  {
    name: 'fusce posuere',
    category: 'Oval',
    description:
      'turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin',
    price: 172.07,
    stock: 90
  },
  {
    name: 'pretium iaculis justo',
    category: 'Oval',
    description:
      'vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus',
    price: 490.74,
    stock: 64
  },
  {
    name: 'in',
    category: 'Oval',
    description:
      'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis',
    price: 260.83,
    stock: 22
  },
  {
    name: 'tellus nisi',
    category: 'Runner',
    description:
      'erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget',
    price: 244.95,
    stock: 67
  }
]

const orders = [
  {
    status: 'placed',
    userId: 1
  },
  {
    status: 'placed',
    userId: 2
  },
  {
    status: 'placed',
    userId: 3
  },
  {
    status: 'placed',
    userId: 4
  },
  {
    status: 'inCart',
    userId: 5
  },
  {
    status: 'inCart',
    userId: 6
  },
  {
    status: 'inCart',
    userId: 7
  },
  {
    status: 'placed',
    userId: 8
  },
  {
    status: 'inCart',
    userId: 9
  },
  {
    status: 'inCart',
    userId: 10
  },
  {
    status: 'inCart',
    userId: 1
  },
  {
    status: 'inCart',
    userId: 2
  },
  {
    status: 'placed',
    userId: 3
  },
  {
    status: 'inCart',
    userId: 4
  },
  {
    status: 'inCart',
    userId: 5
  }
]

const orderProducts = [
  {
    quantity: 2,
    orderId: 5,
    productId: 14
  },
  {
    quantity: 2,
    orderId: 5,
    productId: 30
  },
  {
    quantity: 2,
    orderId: 2,
    productId: 7
  },
  {
    quantity: 2,
    orderId: 2,
    productId: 32
  },
  {
    quantity: 3,
    orderId: 12,
    productId: 45
  },
  {
    quantity: 3,
    orderId: 3,
    productId: 43
  },
  {
    quantity: 2,
    orderId: 1,
    productId: 13
  },
  {
    quantity: 2,
    orderId: 4,
    productId: 10
  },
  {
    quantity: 3,
    orderId: 10,
    productId: 39
  },
  {
    quantity: 1,
    orderId: 4,
    productId: 21
  },
  {
    quantity: 2,
    orderId: 3,
    productId: 25
  },
  {
    quantity: 3,
    orderId: 15,
    productId: 40
  },
  {
    quantity: 1,
    orderId: 9,
    productId: 14
  },
  {
    quantity: 3,
    orderId: 7,
    productId: 30
  },
  {
    quantity: 2,
    orderId: 2,
    productId: 2
  },
  {
    quantity: 2,
    orderId: 14,
    productId: 38
  },
  {
    quantity: 1,
    orderId: 1,
    productId: 30
  },
  {
    quantity: 3,
    orderId: 3,
    productId: 10
  },
  {
    quantity: 1,
    orderId: 15,
    productId: 35
  },
  {
    quantity: 2,
    orderId: 1,
    productId: 36
  },
  {
    quantity: 1,
    orderId: 6,
    productId: 22
  },
  {
    quantity: 3,
    orderId: 9,
    productId: 1
  },
  {
    quantity: 1,
    orderId: 11,
    productId: 20
  },
  {
    quantity: 3,
    orderId: 9,
    productId: 25
  },
  {
    quantity: 3,
    orderId: 3,
    productId: 50
  },
  {
    quantity: 2,
    orderId: 6,
    productId: 46
  },
  {
    quantity: 3,
    orderId: 14,
    productId: 11
  },
  {
    quantity: 2,
    orderId: 1,
    productId: 47
  },
  {
    quantity: 2,
    orderId: 7,
    productId: 23
  },
  {
    quantity: 2,
    orderId: 8,
    productId: 19
  }
]

const tags = [
  {
    name: 'Bathroom'
  },
  {
    name: 'Modern'
  },
  {
    name: 'Moroccan'
  },
  {
    name: 'Natural'
  },
  {
    name: 'Oriental'
  },
  {
    name: 'Outdoor'
  },
  {
    name: 'Persian'
  },
  {
    name: 'Shag'
  },
  {
    name: 'Synthetic'
  },
  {
    name: 'Tribal'
  },
  {
    name: 'Vintage'
  },
  {
    name: 'Woven'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    console.log('db synced!')
    await Promise.all(users.map(user => User.create(user)))

    await Promise.all(tags.map(tag => Tag.create(tag)))

    await Promise.all(products.map(product => Product.create(product)))
    for (let i = 1; i <= 50; i++) {
      let j = Math.floor(Math.random() * 4) + 1
      for (let t = 0; t < j; t++) {
        let k = Math.floor(Math.random() * 12) + 1
        let productI = await Product.findByPk(i)
        await productI.addTags(k)
      }
    }

    await Promise.all(orders.map(order => Order.create(order)))
    for (let i = 1; i < 15; i++) {
      for (let gen = 0; gen < 10; gen++) {
        // let i = Math.floor(Math.random() * 4)
        let orderI = await Order.findByPk(i)
        let j = Math.floor(Math.random() * 45) + 1
        let productI = await Product.findByPk(j)
        await productI.addOrders([orderI])
      }
    }

    // const allTags = await Tag.findAll()
    // const allProducts = await

    // await Promise.all(
    //   orderProducts.map(orderProduct => orderProduct.create(orderProduct))
    // )
  } catch (error) {
    console.log(red(error))
  }

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} productss`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderProducts.length} orderProducts`)
  console.log(`seeded ${tags.length} tags`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
