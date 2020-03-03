import React from 'react'

import {Navbar} from './components'
// import CardSection from './components/card-section'
import InjectedCheckoutForm from './components/checkout-form'

import Routes from './routes'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <CardSection /> */}
      <InjectedCheckoutForm />
    </div>
  )
}

export default App
