/* eslint-disable radix */
import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cart-item'
import {getUserCart} from '../store'
// import {getQuestion} from '../store'
import PlaceOrder from './placeOrder'
import {Link} from 'react-router-dom'

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import {
  // Card,
  // CardContent,
  // CardActions,
  // Typography,
  // CardMedia,
  Button
} from '@material-ui/core'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getUserCart(this.props.match.params.id) // userId
  }
  render() {
    const orderid = this.props.cartId ? this.props.cartId : 0 // needed for checkout, not here
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
          <Button
            size="large"
            color="secondary"
            href={`/Order/${orderid}`}
            // startIcon={<DeleteOutlinedIcon />}
            // onClick={() => {
            //   this.props.removeFromCart(this.props.user.id, this.props.cartItem)
            // }}
          >
            check out
          </Button>
        }
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  products: state.userCart.products,
  cartId: state.userCart.cartId // orderId
})
const mapDispatch = dispatch => ({
  getUserCart: id => {
    dispatch(getUserCart(id))
  }
})

export default connect(mapState, mapDispatch)(Cart)
