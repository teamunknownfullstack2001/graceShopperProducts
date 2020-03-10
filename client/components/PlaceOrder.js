import React from 'react'
import {connect} from 'react-redux'
// import {CartItem} from '.'
import {InjectedCheckoutForm, AddressForm, CheckoutOrderItem} from '.'
import {getOrder, createOrder, getSingleUser} from '../store'

const regEx = {
  email: '^[A-Za-z0-9.-_]+@[A-Za-z0-9]+.[A-Za-z0-9]+$',
  phone: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$',
  zip: '^[0-9]{5}$'
}
class disPlaceOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      password: '',
      email: '',
      address: '',
      zip: '',
      phone: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  componentDidMount() {
    if (this.props.match.params.orderId !== '0') {
      this.props.getOrder(this.props.match.params.orderId) //get the order
    } else {
      this.props.createOrder(this.props.match.params.orderId) //create guest order
    }
  }

  render() {
    const total = this.props.order.total
      ? `$ ${(this.props.order.total / 100).toFixed(2)}`
      : 0
    console.log('in place order', this.state)
    return (
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout:</h2>
        </div>

        <div className="row">
          {this.props.order.products ? (
            <CheckoutOrderItem
              products={this.props.order.products}
              total={total}
            />
          ) : (
            <p>No order</p>
          )}
          {/* {this.props.user.id !== 0 ? (
            <AddressForm
              user={this.props.user}
              state={this.state}
              handleChange={this.handleChange}
            />
          ) : (
            ''
          )} */}
          {/* {this.props.user.id === 0 ? (
            <AddressForm
              // user={this.props.user}
              state={this.state}
              handleChange={this.handleChange}
              order={this.props.order}
              user={this.props.user}
            />
          ) : (
            ''
          )} */}
          {/* <h4 className="mb-3">Payment</h4> */}
          {this.props.order !== undefined ? (
            <InjectedCheckoutForm
              order={this.props.order}
              user={this.props.user}
              state={this.state}
              competedForm={this.state.competedForm}
              handleChange={this.handleChange}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  order: state.order,
  // products: state.userCart.products,
  user: state.user
})
const mapDispatch = dispatch => {
  return {
    getOrder: id => dispatch(getOrder(id)),
    createOrder: id => dispatch(createOrder(id)),
    getSingleUser: id => dispatch(getSingleUser(id))
  }
}

export default connect(mapState, mapDispatch)(disPlaceOrder)
