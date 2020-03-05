import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cart-item'
import {getOrder} from '../store'
import {Link} from 'react-router-dom'

class disPlaceOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      order: []
    }
  }
  componentDidMount() {
    this.props.getOrder(this.props.match.params.id)
    // this.setState({order: this.props.orders})
  }
  render() {
    // console.log('in the orderC', this.props.order.orders[0].total)
    console.log('These are the props: ', this.props)
    const total = this.props.order.total ? this.props.order.total : 0
    console.log('in the orderC', this.props.order.total)
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
        <button type="button">
          <Link to="/orderSuccess">Confirm Order</Link>
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  order: state.order
})
const mapDispatch = dispatch => {
  return {
    getOrder: id => dispatch(getOrder(id))
  }
}

export default connect(mapState, mapDispatch)(disPlaceOrder)
