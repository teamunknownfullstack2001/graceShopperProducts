import CardSection from './card-section'
import React from 'react'
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js'

import axios from 'axios'

class CheckoutForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault()

    const {stripe, elements} = this.props

    if (!stripe || !elements) {
      return
    }

    const {data} = await axios.post(`/api/payment`)
    const result = await stripe.confirmCardPayment(data.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen'
        }
      }
    })

    if (result.error) {
      console.log(result.error.message)
    } else if (result.paymentIntent.status === 'succeeded') {
      console.log('Payment Success!!')
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

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  )
}
