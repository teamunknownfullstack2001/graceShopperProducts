import React from 'react'

import {connect} from 'react-redux'

const DisconnectedItemDetails = props => {
  const orders = props.user.orders
  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          {order.products.map(product => (
            <div key={product.id}>
              <img src={product.imageUrl} />
              <h4> Item: {product.name}</h4>
              <h4> Item Details: {product.description}</h4>
              <h4> Price: {product.price}</h4>
              <h4> Date Ordered: {product.updatedAt}</h4>
              <h3>Total Charged: {order.total}</h3>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const ItemDetails = connect(mapStateToProps, null)(DisconnectedItemDetails)

export default ItemDetails
