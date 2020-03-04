import React from 'react'
import {connect} from 'react-redux'
import {getSingleUser} from '../store'

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }

  render() {
    // console.log('These are the props: ', this.props)
    const {user} = this.props
    const {id, phone, userName, email, address, zip, updateInfo, orders} = user
    console.log('User info: ', user)
    console.log('These are the orders: ', orders)

    return (
      <div key={id}>
        <h1>User name: {userName}</h1>
        <h1>Phone Number: {phone}</h1>
        <h2>Email: {email}</h2>
        <h2>Address: {address}</h2>
        <h2>Zip: {zip}</h2>
        <div>
          {orders
            ? orders.map(order => (
                <div key={order.id}>
                  <h3> Order Id: {order.id}</h3>
                  <h3> Status: {order.status}</h3>
                  <h3>
                    Order Details:{' '}
                    {order.products.map(product => (
                      <div key={product.id}>
                        <img src={product.imageUrl} />
                        <h4> Item: {product.name}</h4>

                        <h4> Price: {product.price}</h4>

                        <p> Date Ordered: {product.updatedAt}</p>
                      </div>
                    ))}
                  </h3>
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
