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

Users can log in/sign up using our native forms or through Google. All purchases can be conducted as a Guest or User.

Customers can search through a diverse selection of friends and book time with them on a weekly basis. Friends can be sorted according to specific qualities by clicking on a tag in each Friend page.

After selecting friends to buy, customers can continue shopping or go to their cart. From their cart, customers can delete friends, or increase / decrease quantity. Quantity cannot exceed the stock of the product. There are only 5 "Guys" left, so we might as well buy all 5 of them, before anyone else does!

<p align="center">
  <img src="public/readme/UserCart.gif">
</p>

Upon checkout, a User’s shipment / contact info will be pre-populated based on the information in their profile. If a User updates their info here their profiles will be automatically revised as well. This form validates the format of each customer's information to prevent mistakes. For example, a customer will not be able to checkout if their zip code is not exactly 5 digits, and a gentle reminder will populate the "zip" field.

Once a customer's payment info is verified, they will be redirected to an order success page, and will receive an order confirmation message at the email address provided during checkout.

<p align="center">
  <img src="public/readme/UserCheckout.gif">
</p>

## For Admins:

Admins can view User and Order info through the Profile dropdown in the Navbar. They can also edit and delete Users as necessary through these pages, which are only visible to Admins.

<p align="center">
  <img src="public/readme/AdminEditUser.gif">
</p>

They can add friends to the inventory through a button on the main page, as well as edit or delete friends through each individual Friend page. Buttons to access this functionality are only available to Admins.

<p align="center">
  <img src="public/readme/AdminEditProduct.gif">
</p>

### built by #unknown for FullStack Academy

**_[Mark Czernyk, Gabriel Postelnicu,Tianxin Angland, Chaohui (Peter) Chen]_**
