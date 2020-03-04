/* eslint-disable radix */
import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cart-item'
import {getUserCart} from '../store'
// import {getQuestion} from '../store'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getUserCart(this.props.match.params.id)
  }
  render() {
    return (
      <div>
        <h3>Cart</h3>

        {this.props.products
          ? this.props.products.map(cartItem => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                cartId={this.props.cartId}
              />
            ))
          : ''}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  products: state.userCart.products,
  cartId: state.userCart.cartId
})
const mapDispatch = dispatch => ({
  getUserCart: id => {
    dispatch(getUserCart(id))
  }
})

export default connect(mapState, mapDispatch)(Cart)
