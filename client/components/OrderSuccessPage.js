import React from 'react'
import {connect} from 'react-redux'
import {getSingleUser, getOrderDetails} from '../store'

class OrderSuccessPage extends React.Component {
  componentDidMount() {
    if (+this.props.match.params.userId !== 0) {
      this.props.getSingleUser(this.props.match.params.userId)
    }
    this.props.getOrderDetails(this.props.match.params.orderId)
  }

  render() {
    const {order} = this.props

    return (
      <div>
        <h1>
          Thank you for your order.
          {this.props.user ? this.props.user.userName : ''} Your order ID is{' '}
          {order.id}. Your order will be shipped to {order.shippingAddress}. You
          will also receive email receipt at {order.shippingEmail}
        </h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    order: state.order
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleUser: id => dispatch(getSingleUser(id)),
  getOrderDetails: id => dispatch(getOrderDetails(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccessPage)
