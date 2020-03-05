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
    }
  }
}

function CardSection() {
  return (
    <label>
      {/* please add card details */}
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  )
}

export default CardSection
