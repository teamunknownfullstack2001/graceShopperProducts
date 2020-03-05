import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cart-item'
import InjectedCheckoutForm from './checkout-form'
import {getOrder, createOrder} from '../store'

import {Link} from 'react-router-dom'

class disPlaceOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      order: []
    }
  }
  componentDidMount() {
    console.log('thie props', this.props.match.params.id)
    if (this.props.match.params.id !== '0') {
      console.log('in the get order ')
      this.props.getOrder(this.props.match.params.id) //get the order
    } else {
      this.props.createOrder(this.props.match.params.id) //create guest order
    }
  }
  render() {
    const total = this.props.order.total ? this.props.order.total : 0
    return (
      <div>
        {this.props.order.products ? (
          this.props.order.products.map(cartItem => (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              cartId={this.props.cartId}
            />
          ))
        ) : (
          <p>No order</p>
        )}
        <p>{total}</p>

        {this.props.order !== undefined ? (
          <InjectedCheckoutForm
            order={this.props.order}
            user={this.props.user}
          />
        ) : (
          ''
        )}

        {/* <button type="button">Confirm Order</button> */}
        {/* <button type="button">
          <Link to="/orderSuccess">Confirm Order</Link>
        </button> */}
      </div>
    )
  }
}

const mapState = state => ({
  order: state.order,
  user: state.user
})
const mapDispatch = dispatch => {
  return {
    getOrder: id => dispatch(getOrder(id)),
    createOrder: id => dispatch(createOrder(id))
  }
}

export default connect(mapState, mapDispatch)(disPlaceOrder)
