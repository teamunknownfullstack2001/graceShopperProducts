import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo, getOrderInfo} from '../store'

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.getUserInfo()
    this.props.getOrderInfo()
  }
  render() {
    //  console.log("THESE ARE THE PROPS IN ADMINPAGE!", this.props)
    const {info} = this.props
    const {users, orders} = info
    console.log('This is the info I want: ', info)
    console.log('These are the users: ', users)
    console.log('These are the orders: ', orders)
    return (
      <div>
        <h1>Welcome Admin</h1>
        <h3>
          These are all the users:
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <div>User Id: {user.id}</div>
                <div>User Email: {user.email}</div>
              </li>
            ))}
          </ul>
        </h3>

        <h3>
          {' '}
          These are all the orders:
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                <div>Order Id: {order.id}</div>
                <div>User Id For Order: {order.userId} </div>
                <div>Status: {order.status}</div>
                <div>Order Date: {order.updatedAt}</div>
              </li>
            ))}
          </ul>
        </h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('This is the state: ', state)
  return {
    // users: state.users,
    // orders: state.orders
    info: state.admin
  }
}

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  getOrderInfo: () => dispatch(getOrderInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
