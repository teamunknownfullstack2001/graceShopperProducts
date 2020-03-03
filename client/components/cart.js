/* eslint-disable radix */
import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cart-item'
// import {getUserCart} from '../store'
// import {getQuestion} from '../store'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    // this.props.getUserCart(this.props.user.id)
  }
  render() {
    return (
      <div>
        <h3>Cart</h3>
        {/* <h3>user</h3> */}
        {/* <p>
          {this.props.user ? `${JSON.stringify(this.props.user)}` : 'notuser'}
        </p>
        <h3>cart</h3>
        <p>
          {this.props.user
            ? `${JSON.stringify(this.props.userCart)}`
            : 'notuser'}
        </p> */}
        {this.props.userCart.map(cartItem => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
        {/* <CartItem /> */}
      </div>
    )
  }
}

const mapState = state => ({user: state.user, userCart: state.userCart})
const mapDispatch = dispatch => ({
  // getUserCart: id => {
  //   dispatch(getUserCart(id))
  // }
})

export default connect(mapState, mapDispatch)(Cart)