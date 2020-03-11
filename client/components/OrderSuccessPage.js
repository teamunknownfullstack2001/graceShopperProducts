import React from 'react'
import {connect} from 'react-redux'
import {getSingleUser, getOrderDetails} from '../store'
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore'
import {Button} from '@material-ui/core'

class OrderSuccessPage extends React.Component {
  componentDidMount() {
    if (+this.props.match.params.userId !== 0) {
      this.props.getSingleUser(this.props.match.params.userId)
    }
    this.props.getOrderDetails(this.props.match.params.orderId)
  }

  render() {
    const {order, user} = this.props

    return (
      <div className="standardContainer">
        <div className="singleProductContainer">
          <div className="singleProductImg">
            <img
              className="package"
              src="https://www.pngarts.com/files/1/Package-PNG-Background-Image.png"
              alt="box"
            />
          </div>

          <div className="singlerProductMain">
            <div className="standardContainer">
              <h2>Success!</h2>
              <h3>
                Thank you for your order
                {this.props.user ? ', ' + this.props.user.userName : ''} - we
                hope you enjoy your new friends!
              </h3>
              <p>
                <i>order id: {order.id}</i>
              </p>
              <p>
                <i>Your order will be shipped to {order.shippingAddress}.</i>
              </p>
              <p>
                <i>
                  You will also receive email receipt at {order.shippingEmail}.
                </i>
              </p>
            </div>
          </div>
          <div className="singleProductButtons">
            <Button
              size="large"
              color="primary"
              startIcon={<SettingsBackupRestoreIcon />}
              href="/products"
            >
              Return to Shop
            </Button>
          </div>
        </div>

        {/* //       <div>
//         <h1 className="orderSuccessTitle">We received your order</h1>
//         <div className="deliveryContainter">
//           <h4 className="deliveryDetails">
//             <u>Delivery Details</u>
//           </h4>
//           <h5>Order Number: {order.id}</h5>
//           <h5>Delivery For: {user ? user.userName : ''}</h5>

//           <h5>Phone Number: {user.phone}</h5>

//           <h4>
//             <u>Order Summary</u>
//           </h4>
//           <h5>Shipping Address: {user.address} </h5>
//           <h5>Order Confirmation Email: {user.email}</h5>
//           <h5>Order Total: ${(order.total / 100).toFixed(2)}</h5>
//         </div>

//         <Button size="large" color="primary" href="/products">
//           Return to Shop
//         </Button> */}
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
