import React from 'react'
import {CardElement} from '@stripe/react-stripe-js'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      width: '30px',
      border: '10px solid red',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    },
    empty: {
      color: '#fa755a',
      iconColor: '#fa755a'
    },
    complete: {
      color: 'green',
      iconColor: 'green'
    }
  }
}

function CardSection() {
  return (
    <div className="form-row">
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  )
}

export default CardSection
