import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cart-item'
import InjectedCheckoutForm from './checkout-form'
import {getOrder, createOrder, getSingleUser} from '../store'
import Typography from '@material-ui/core/Typography'
import AddressForm from './AddressForm'
import {Link} from 'react-router-dom'
import OrderItem from './OrderItem'

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
    console.log('thie props', this.props)
    if (this.props.match.params.orderId !== '0') {
      console.log('in the get order ')
      this.props.getOrder(this.props.match.params.orderId) //get the order
    } else {
      this.props.createOrder(this.props.match.params.orderId) //create guest order
    }
  } //{`$ ${(price / 100).toFixed(2)}`}

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
          {/* {this.props.user.id ? <AddressForm user={this.props.user} /> : ''} */}
          {this.props.order.products ? (
            <OrderItem products={this.props.order.products} total={total} />
          ) : (
            <p>No order</p>
          )}
          {this.props.user.id !== 0 ? (
            <AddressForm
              user={this.props.user}
              state={this.state}
              handleChange={this.handleChange}
            />
          ) : (
            ''
          )}
          {this.props.user.id === 0 ? (
            <AddressForm
              // user={this.props.user}
              state={this.state}
              handleChange={this.handleChange}
            />
          ) : (
            ''
          )}
        </div>

        <Typography variant="h6" gutterBottom>
          Payment
        </Typography>
        {this.props.order !== undefined ? (
          <InjectedCheckoutForm
            order={this.props.order}
            user={this.props.user}
            state={this.state}
          />
        ) : (
          ''
        )}
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
