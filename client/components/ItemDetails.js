import React from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const DisconnectedItemDetails = props => {
  console.log('What are the props in itemDetails: ', props)
  const orders = props.user.orders
  const product = order.products[props.match.params.id]
  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          {order.products.map(product => (
            <div key={product.id}>
              <img src={product.imageUrl} />
              <h4> Friend: {product.name}</h4>
              <h4> Friend Details: {product.description}</h4>
              <h4> Price: {product.price}</h4>
              <h4> Date Ordered: {product.updatedAt}</h4>
              <h3> Total Charged: {order.total}</h3>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  // console.log('This is the state: ', state)
  return {
    user: state.user
  }
}

const ItemDetails = connect(mapStateToProps, null)(DisconnectedItemDetails)

export default ItemDetails
