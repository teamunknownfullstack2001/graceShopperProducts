import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleUser} from '../store'

class DisconnectedOrderHistory extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }
  render() {
    const orders = this.props.user.orders
    return (
      <div>
        {orders
          ? orders.map(order =>
              order.status === 'placed' ? (
                <div key={order.id}>
                  <h3> Order Id: {order.id}</h3>
                  <h3> Status: {order.status}</h3>
                  <h3>
                    {order.products.map(product => (
                      <div key={product.id}>
                        <h3>Total Charged: {order.total}</h3>
                        <h4> Item: {product.name}</h4>
                        <h4> Item Details: {product.description}</h4>
                        <h4> Price: {product.price}</h4>
                        <p> Date Ordered: {product.updatedAt}</p>

                        <div>
                          <button type="button">
                            <Link to={`/itemDetails/${product.id}`}>
                              {' '}
                              Item Details{' '}
                            </Link>
                          </button>
                        </div>
                      </div>
                    ))}
                  </h3>
                </div>
              ) : (
                ''
              )
            )
          : 'No orders'}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => ({
  getSingleUser: id => dispatch(getSingleUser(id))
})

const OrderHistory = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedOrderHistory)

export default OrderHistory
