/* eslint-disable radix */
import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cart-item'
import {getUserCart} from '../store'
// import {getQuestion} from '../store'
import PlaceOrder from './placeOrder'
import {Link} from 'react-router-dom'
class Cart extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getUserCart(this.props.match.params.id)
  }
  render() {
    const orderid = this.props.cartId ? this.props.cartId : 0
    console.log('this cart', this.props.cartId)
    return (
      <div>
        <h3>Cart</h3>

        {this.props.products
          ? this.props.products.map(cartItem => (
              <CartItem button={true} key={cartItem.id} cartItem={cartItem} />
            ))
          : ''}
        {
          <button type="button">
            {' '}
            <Link to={`/Order/${orderid}`}>Order</Link>
          </button>
        }
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
