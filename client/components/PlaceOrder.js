import React from 'react'
import {connect} from 'react-redux'
// import {CartItem} from '.'
import {InjectedCheckoutForm, CheckoutOrderItem} from '.'
import {getOrder, createOrder, getSingleUser} from '../store'
import {withStyles} from '@material-ui/core/styles'

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

    return (
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout</h2>
        </div>

        <div className="row">
          {this.props.order.products ? (
            <CheckoutOrderItem
              products={this.props.order.products}
              total={total}
            />
          ) : (
            ''
          )}

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
