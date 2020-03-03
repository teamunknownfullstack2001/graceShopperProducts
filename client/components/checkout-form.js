import CardSection from './card-section'
import React from 'react'
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import {submitPayment} from '../store'

class DisconnectedCheckoutForm extends React.Component {
  handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    const {stripe, elements} = this.props

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }
    console.dir(event)
    this.props.submitPayment()
    console.dir(this.props.client_secret)
    const result = await stripe.confirmCardPayment(
      'pi_1GISa5CxxfbFMZyMqk9K6l0i_secret_81GG3YuUPQl0X06NlVMoHLMzp',
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen'
          }
        }
      }
    )

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message)
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }

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

const mapState = state => {
  return {
    client_secret: state.payment.client_secret
  }
}

const mapDispatch = dispatch => ({
  submitPayment: () => {
    dispatch(submitPayment({}))
  }
})
const CheckoutForm = connect(mapState, mapDispatch)(DisconnectedCheckoutForm)

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  )
}
