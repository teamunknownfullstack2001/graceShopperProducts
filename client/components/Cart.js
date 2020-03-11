/* eslint-disable radix */
import React from 'react'
import {connect} from 'react-redux'
import {CartItem} from '.'
import {getUserCart} from '../store'

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
// const Total = props => {
//   console.log('These are the props in Total', props)
//   const total = props.products.reduce((acc, cartItem) => {
//     return acc + +cartItem.price * +cartItem.orderproduct.quantity
//   })
//   return (
//   <h3>Total: {total}</h3>
//   )
// }

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

    console.log('These are the props:', this.props)

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
            <h3 className="text-center">Your Cart is Empty</h3>
          )
        ) : (
          ''
        )}{' '}
        {products && products.length > 0 ? (
          <h3 className="totalDisplay">
            {' '}
            Total: $
            {(
              products.reduce((acc, cartItem) => {
                return acc + +cartItem.price * +cartItem.orderproduct.quantity
              }, 0) / 100
            ).toFixed(2)}{' '}
          </h3>
        ) : (
          ''
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
            Check Out More Awesome Products!
          </Button>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  products: state.userCart.products,
  cartId: state.userCart.cartId // this is orderId
})
const mapDispatch = dispatch => ({
  getUserCart: id => {
    dispatch(getUserCart(id))
  }
})

export default connect(mapState, mapDispatch)(Cart)
