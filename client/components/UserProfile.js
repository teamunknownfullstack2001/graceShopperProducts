import React from 'react'
import {connect} from 'react-redux'
import {getSingleUser} from '../store'
import OrderHistory from './OrderHistory'

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }

  render() {
    // console.log('These are the props: ', this.props)
    const {user} = this.props
    const {id, phone, userName, updateInfo, orders} = user
    console.log('These are the orders: ', orders)

    return (
      <div key={id}>
        <h1>{userName}</h1>
        <p>{phone}</p>
        <div>
          {orders
            ? orders.map(order => (
                <div key={order.id}>
                  <h3> Order Id: {order.id}</h3>
                  <h3> Status: {order.status}</h3>
                </div>
              ))
            : 'No orders'}
        </div>
        <button type="submit" onClick={updateInfo}>
          Update Info
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log('This is the state: ', state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleUser: id => dispatch(getSingleUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
