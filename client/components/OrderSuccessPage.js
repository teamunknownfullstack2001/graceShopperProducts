import React from 'react'
// import {Link} from 'react-router-dom'
const OrderSuccessPage = props => {
  const {user} = props
  console.log('this is the user:', user)
  return (
    <div>
      <h1>Thank you for your order {user}!</h1>
    </div>
  )
}

export default OrderSuccessPage
