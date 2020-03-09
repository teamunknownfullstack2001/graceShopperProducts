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
      <div>
        <h3>Cart</h3>

        {products
          ? products.map(cartItem => {
              return (
                <CartItem button={true} key={cartItem.id} cartItem={cartItem} />
              )
            })
          : ''}
        {
          <Button
            size="large"
            color="primary"
            href={`/Order/${orderid}/${userid}`}
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
