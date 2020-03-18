# Welcome to friendShop by #unknown

In our overly commodified world, what is left to sell?

We’ve polluted our relationships with smartphones, social media, and dating apps. We live atomized lives in crowded cities where we don’t even know our neighbors.

_Can we go back? How do we learn to form meaningful relationships again?_

Unfortunately, this website cannot remedy these problems. In the meantime, we’ve found a quick hack. Forget awkward small talk at the bar, don’t worry about joining that sports league...

Friendship is just a click away at **_friendShop_**.

Get started now by renting friends directly from our expertly curated collection - you’ve got a friend in **_friendShop_**.

## Setup

To test out this project locally , you'll need to take the following steps:

- Fork and clone this repository

```
git clone <filename>
```

- Install the NPM Package with the following command:

```
npm install
```

_We are using PostgreSQL to store our data. Please download PostgreSQL [here](https://postgresapp.com/) and follow the installation instructions._

- Create a database using the following command once you've installed PostgreSql.

```
createdb unknown
```

To launch this website locally on [localhost 8080](localhost:8080), run the following command:

```
npm run start-dev
```

You can also browse our live website [here](https://unkowngraceshopper.herokuapp.com/)

## For Users & Guests:

Users can log in/sign up using our native forms or through Google. All purchases can be conducted as a Guest user.

Customers can search through a diverse selection of friends and book time with them on a weekly basis. Friends can be sorted according to specific qualities by clicking on a tag in each Friend page.

Upon checkout, a user’s shipment / contact info will be pre-populated based on the information in their profile. If a user updates their info here their profiles will be automatically revised as well.

Once payment info is verified, the user will be redirected to an order success page, and will receive an order confirmation email to the provided email address.

## For Admins:

Admins can view user and order info through the profile dropdown in the navbar. They can also edit and delete users as necessary through these pages, which are only visible to admins. They can add friends to the inventory through a button on the main page, as well as edit or delete friends through each individual Friend page. Buttons to access this functionality are only available to admins.

### built by #unknown for FullStack Academy

**_[Mark Czernyk, Gabriel Postelnicu,Tianxin Angland, Chaohui (Peter) Chen]_**
