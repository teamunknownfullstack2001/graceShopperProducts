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
    name: 'Bill',
    imageUrl: '/friends/01 man.png',
    category: 'Short-Term',
    description:
      'rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
    price: 30612,
    stock: 75
  },
  {
    name: 'Guy',
    imageUrl: '/friends/guy.png',
    category: 'Unconditional',
    description:
      'porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec',
    price: 2500000,
    stock: 7
  },
  {
    name: 'Denise',
    imageUrl: '/friends/01 woman.png',
    category: 'Long-Term',
    description:
      'luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec',
    price: 13369,
    stock: 37
  },
  {
    name: 'Mike',
    imageUrl: '/friends/02 man.png',
    category: 'Contitional',
    description:
      'rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis',
    price: 26466,
    stock: 45
  },
  {
    name: 'Carol',
    imageUrl: '/friends/02 woman.png',
    category: 'Noncommital',
    description:
      'pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras',
    price: 96845,
    stock: 37
  },
  {
    name: 'Fred',
    imageUrl: '/friends/03 man.png',
    category: 'Long-Term',
    description:
      'morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis',
    price: 3828,
    stock: 76
  },
  {
    name: 'Mary',
    imageUrl: '/friends/03 woman.png',
    category: 'Fair-Weather',
    description:
      'etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis',
    price: 51443,
    stock: 100
  },

  {
    name: 'Ted',
    imageUrl: '/friends/04 man.png',
    category: 'Fair-Weather',
    description:
      'ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est',
    price: 67894,
    stock: 94
  },
  {
    name: 'Steph',
    imageUrl: '/friends/04 woman.png',
    category: 'Long-Term',
    description:
      'augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea',
    price: 14258,
    stock: 14
  },
  {
    name: 'Walter',
    imageUrl: '/friends/05 man.png',
    category: 'Long-Term',
    description:
      'tortor duis mattis egestas metus aenean fermentum donec ut mauris',
    price: 89037,
    stock: 29
  },
  {
    name: 'Katie',
    imageUrl: '/friends/05 woman.png',
    category: 'Long-Term',
    description:
      'turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus',
    price: 7821,
    stock: 68
  },
  {
    name: 'Chad',
    imageUrl: '/friends/06 man.png',
    category: 'Short-Term',
    description:
      'nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu',
    price: 95723,
    stock: 53
  },
  {
    name: 'Camile',
    imageUrl: '/friends/06 woman.png',
    category: 'Long-Term',
    description:
      'integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices',
    price: 7355,
    stock: 87
  },
  {
    name: 'Josh',
    imageUrl: '/friends/07 man.png',
    category: 'Contitional',
    description:
      'magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum',
    price: 61934,
    stock: 43
  },
  {
    name: 'Miranda',
    imageUrl: '/friends/07 woman.png',
    category: 'Fair-Weather',
    description: 'non mi integer ac neque duis bibendum morbi non quam nec dui',
    price: 53542,
    stock: 78
  },
  {
    name: 'Chris',
    imageUrl: '/friends/08 man.png',
    category: 'Long-Term',
    description:
      'nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue',
    price: 95503,
    stock: 14
  },
  {
    name: 'Ali',
    imageUrl: '/friends/08 woman.png',
    category: 'Long-Term',
    description:
      'donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla',
    price: 60652,
    stock: 36
  },
  {
    name: 'Barack',
    imageUrl: '/friends/obama.png',
    category: 'Fair-Weather',
    description:
      'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis',
    price: 10000000,
    stock: 22
  },
  {
    name: 'Joe',
    imageUrl: '/friends/09 man.png',
    category: 'Short-Term',
    description:
      'et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin',
    price: 70947,
    stock: 21
  },
  {
    name: 'Megan',
    imageUrl: '/friends/09 woman.png',
    category: 'Contitional',
    description:
      'scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor',
    price: 82464,
    stock: 24
  },
  {
    name: 'Ihor',
    imageUrl: '/friends/10 man.png',
    category: 'Long-Term',
    description:
      'luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi',
    price: 7761,
    stock: 63
  },
  {
    name: 'Lydia',
    imageUrl: '/friends/10 woman.png',
    category: 'Contitional',
    description:
      'tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia',
    price: 43308,
    stock: 41
  },
  {
    name: 'Jerry',
    imageUrl: '/friends/11 man.png',
    category: 'Long-Term',
    description:
      'morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus',
    price: 62111,
    stock: 59
  },
  {
    name: 'Maria',
    imageUrl: '/friends/11 woman.png',
    category: 'Long-Term',
    description:
      'enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis',
    price: 20572,
    stock: 42
  },
  {
    name: 'Nick',
    imageUrl: '/friends/12 man.png',
    category: 'Long-Term',
    description:
      'vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum',
    price: 6775,
    stock: 24
  },
  {
    name: 'Kaitlin',
    imageUrl: '/friends/12 woman.png',
    category: 'Long-Term',
    description:
      'quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum',
    price: 86248,
    stock: 66
  },
  {
    name: 'Lebron',
    imageUrl: '/friends/lebron.png',
    category: 'Fair-Weather',
    description:
      'vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus',
    price: 10000000,
    stock: 64
  },
  {
    name: 'Steve',
    imageUrl: '/friends/13 man.png',
    category: 'Contitional',
    description:
      'morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla',
    price: 48172,
    stock: 96
  },
  {
    name: 'Laura',
    imageUrl: '/friends/13 woman.png',
    category: 'Short-Term',
    description:
      'quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis',
    price: 78762,
    stock: 72
  },
  {
    name: 'Matthew',
    imageUrl: '/friends/14 man.png',
    category: 'Fair-Weather',
    description:
      'non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa',
    price: 51679,
    stock: 68
  },
  {
    name: 'Dude',
    imageUrl: '/friends/Dude.png',
    category: 'Long-Term',
    description:
      'quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh',
    price: 100,
    stock: 18
  },
  {
    name: 'Trish',
    imageUrl: '/friends/14 woman.png',
    category: 'Noncommital',
    description:
      'tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc',
    price: 64419,
    stock: 1
  },
  {
    name: 'Craig',
    imageUrl: '/friends/15 man.png',
    category: 'Long-Term',
    description:
      'nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo',
    price: 72508,
    stock: 63
  },
  {
    name: 'Cindy',
    imageUrl: '/friends/15 woman.png',
    category: 'Noncommital',
    description:
      'pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien',
    price: 48056,
    stock: 54
  },
  {
    name: 'Dave',
    imageUrl: '/friends/16 man.png',
    category: 'Contitional',
    description: 'a odio in hac habitasse platea dictumst maecenas ut massa',
    price: 3177,
    stock: 25
  },
  {
    name: 'Ariana',
    imageUrl: '/friends/grande.png',
    category: 'Long-Term',
    description:
      'donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a',
    price: 10000000,
    stock: 62
  },
  {
    name: 'Carly',
    imageUrl: '/friends/16 woman.png',
    category: 'Short-Term',
    description:
      'turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam',
    price: 39147,
    stock: 1
  },
  {
    name: 'Marcello',
    imageUrl: '/friends/17 man.png',
    category: 'Unconditional',
    description:
      'congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo',
    price: 83503,
    stock: 7
  },
  {
    name: 'Snoop',
    imageUrl: '/friends/snoop.png',
    category: 'Fair-Weather',
    description:
      'turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin',
    price: 10000000,
    stock: 90
  },
  {
    name: 'Christine',
    imageUrl: '/friends/17 woman.png',
    category: 'Short-Term',
    description:
      'nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel',
    price: 90461,
    stock: 79
  },
  {
    name: 'Jackie',
    imageUrl: '/friends/jackie.png',
    category: 'Unconditional',
    description:
      'hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque',
    price: 10000000,
    stock: 87
  },
  {
    name: 'Don',
    imageUrl: '/friends/18 man.png',
    category: 'Long-Term',
    description:
      'nec nisi volutpat eleifend donec ut dolor morbi vel lectus in',
    price: 49982,
    stock: 75
  },
  {
    name: 'Sarah',
    imageUrl: '/friends/18 woman.png',
    category: 'Fair-Weather',
    description:
      'eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus',
    price: 6511,
    stock: 7
  },
  {
    name: 'Norm',
    imageUrl: '/friends/19 man.png',
    category: 'Fair-Weather',
    description:
      'amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis',
    price: 80418,
    stock: 37
  },
  {
    name: 'Justin',
    imageUrl: '/friends/Bieber.png',
    category: 'Short-Term',
    description:
      'sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet',
    price: 1000000,
    stock: 18
  },
  {
    name: 'Robin',
    imageUrl: '/friends/19 woman.png',
    category: 'Contitional',
    description:
      'non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing',
    price: 14211,
    stock: 52
  },
  {
    name: 'Richard',
    imageUrl: '/friends/20 man.png',
    category: 'Long-Term',
    description:
      'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh',
    price: 9729,
    stock: 93
  },
  {
    name: 'Ariel',
    imageUrl: '/friends/20 woman.png',
    category: 'Short-Term',
    description:
      'proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio',
    price: 34423,
    stock: 5
  },
  {
    name: 'Blake',
    imageUrl: '/friends/musician.png',
    category: 'Noncommital',
    description:
      'posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis',
    price: 38887,
    stock: 19
  },
  {
    name: 'Benedict',
    imageUrl: '/friends/benedict.png',
    category: 'Short-Term',
    description:
      'erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget',
    price: 99,
    stock: 67
  }
]

const orders = [
  {
    status: 'placed',
    userId: 1,
    total: 1000,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'placed',
    userId: 2,
    total: 1000,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'placed',
    userId: 3,
    total: 1000,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'placed',
    userId: 4,
    total: 1000,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'inCart',
    userId: 5,
    total: 0,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'inCart',
    userId: 6,
    total: 0,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'inCart',
    userId: 7,
    total: 0,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'placed',
    userId: 8,
    total: 1000,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'inCart',
    userId: 9,
    total: 0,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'inCart',
    userId: 10,
    total: 0,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'inCart',
    userId: 1,
    total: 0,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'inCart',
    userId: 2,
    total: 0,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'placed',
    userId: 3,
    total: 1000,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'inCart',
    userId: 4,
    total: 0,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  },
  {
    status: 'inCart',
    userId: 5,
    total: 0,
    shippingEmail: 'yous@example.com',
    stripeId: 'pi_1GLR6ICxxfbFMZyM########'
  }
]

const tags = [
  {
    name: 'Loyal'
  },
  {
    name: 'Honest'
  },
  {
    name: 'Wise'
  },
  {
    name: 'Supportive'
  },
  {
    name: 'Motivational'
  },
  {
    name: 'Adventurous'
  },
  {
    name: 'Cool'
  },
  {
    name: 'Ambitious'
  },
  {
    name: 'Creative'
  },
  {
    name: 'Reckless'
  },
  {
    name: 'Laid-Back'
  },
  {
    name: 'Conscientious'
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
  } catch (error) {
    console.log(red(error))
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} productss`)
  console.log(`seeded ${orders.length} orders`)
  // console.log(`seeded ${orderProduct.length} orderProducts`)
  console.log(`seeded ${tags.length} tags`)
  // console.log(`seeded ${orderItems.length} orderItems`)
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
