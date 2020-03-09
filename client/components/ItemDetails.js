import React from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const DisconnectedItemDetails = props => {
  console.log('What are the props in itemDetails: ', props)
  const orders = props.user.orders
  // const product = props.product
  // console.log('This is the product: ', product)
  const product = order.products[props.match.params.id]
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

      {/* <img src={product.imageUrl} />
                    <h4> Item: {product.name}</h4>
                    <h4> Description: {product.description}</h4>
                    <h4> Price: {product.price}</h4>
                    <p> Date Ordered: {product.updatedAt}</p> */}
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
