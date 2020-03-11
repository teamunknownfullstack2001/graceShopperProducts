/* eslint-disable radix */
import React from 'react'
import {connect} from 'react-redux'
import {CartItem} from '.'
import {getUserCart} from '../store'
import MDSpinner from 'react-md-spinner'
import {Button} from '@material-ui/core'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getUserCart(this.props.match.params.id) // userId
  }
  // eslint-disable-next-line complexity
  render() {
    const orderid = this.props.cartId ? this.props.cartId : 0
    const userid = this.props.user.id ? this.props.user.id : 0
    const {products} = this.props
    // Page is loading
    if (products === undefined) {
      return (
        <div className="d-flex justify-content-center">
          <MDSpinner size={100} />
        </div>
      )
    }

    return (
      <div className="standardContainer">
        <div className="d-flex flex-column justify-content-center">
          <h1>Cart</h1>
          {products.length > 0 ? (
            products.map(cartItem => {
              return (
                <CartItem button={true} key={cartItem.id} cartItem={cartItem} />
              )
            })
          ) : (
            <h3 className="text-center">Your Cart is Empty</h3>
          )}
          <div className="checkoutBottom">
            <div>
              {products && products.length > 0 ? (
                <h2 className="totalDisplay">
                  {' '}
                  Total: $
                  {(
                    products.reduce((acc, cartItem) => {
                      return (
                        acc + +cartItem.price * +cartItem.orderproduct.quantity
                      )
                    }, 0) / 100
                  ).toFixed(2)}{' '}
                </h2>
              ) : (
                ''
              )}
            </div>
            {products && products.length > 0 ? (
              <Button
                size="large"
                style={{color: 'green'}}
                href={`/Order/${orderid}/${userid}`}
              >
                Check Out
              </Button>
            ) : (
              <div className="cartItemPart">
                <Button size="large" color="primary" href="/products">
                  Browse Our Awesome Friends!
                </Button>
              </div>
            )}
          </div>
        </div>
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
