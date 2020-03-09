/* eslint-disable radix */
import React from 'react'
import {connect} from 'react-redux'
import {CartItem} from '.'
import {getUserCart} from '../store'
// import {getQuestion} from '../store'
// import PlaceOrder from './PlaceOrder'
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
    const orderid = this.props.cartId ? this.props.cartId : 0
    const userid = this.props.user.id ? this.props.user.id : 0
    const {products} = this.props

    return (
      <div className="d-flex flex-column justify-content-center">
        <h1>Cart:</h1>
        {products ? (
          products.length > 0 ? (
            products.map(cartItem => {
              return (
                <CartItem button={true} key={cartItem.id} cartItem={cartItem} />
              )
            })
          ) : (
            <h3 className="text-center">Your Unknown Cart is Empty</h3>
          )
        ) : (
          'No Product'
        )}

        {products && products.length > 0 ? (
          <Button
            size="large"
            color="primary"
            href={`/Order/${orderid}/${userid}`}
          >
            Check Out
          </Button>
        ) : (
          <Button size="large" color="primary" href="/products">
            CheckOut More Awsome Products!
          </Button>
        )}
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
