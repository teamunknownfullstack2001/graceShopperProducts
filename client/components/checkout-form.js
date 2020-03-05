import CardSection from './card-section'
import React from 'react'
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js'

import axios from 'axios'

class CheckoutForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault()

    const {stripe, elements, order, user} = this.props

    if (!stripe || !elements) {
      return
    }
    console.log('=====order', order, user)
    const paymentBody = {
      // name: user.userName,
      amount: Math.floor(order.total * 100),
      currency: 'usd',
      metadata: {integration_check: 'accept_a_payment'}
    }
    const {data} = await axios.post(`/api/payment`, paymentBody)
    const result = await stripe.confirmCardPayment(data.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.userName
        }
      }
    })

    if (result.error) {
      console.log(result.error.message)
      // ask them to try again!!
    } else if (result.paymentIntent.status === 'succeeded') {
      console.log('Payment Success!!Should Redirect to Order Success Page')
      // change
    }
  }

  ////https://stripe.com/docs/testing find test card numbers here
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button type="submit" disabled={!this.props.stripe}>
          Confirm order
        </button>
      </form>
    )
  }
}

export default function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          order={props.order}
          user={props.user}
        />
      )}
    </ElementsConsumer>
  )
}
