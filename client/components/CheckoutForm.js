import {CardSection} from '.'
import React from 'react'
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store'
import axios from 'axios'

class CheckoutForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault()

    const {stripe, elements, order, user, state, updateuser} = this.props

    //create the user || update the user info
    // await this.props.updateuser(user.id, state)

    if (!stripe || !elements) {
      return
    }
    // console.log('=====order', order, user)
    const paymentBody = {
      amount: Math.floor(order.total),
      currency: 'usd',
      metadata: {integration_check: 'accept_a_payment'}
    }
    const {data} = await axios.post(`/api/payment`, paymentBody)
    const result = await stripe.confirmCardPayment(data.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.userName
        }
      }
    })

    if (result.error) {
      console.log(result.error.message)
    } else if (result.paymentIntent.status === 'succeeded') {
      console.log(
        'Payment Success!!Should Redirect to Order Success Page',
        result.paymentIntent.id
      )
      // console.log(stripe, elements, order, user, state, updateuser)
      if (user.id === 0) {
        user.email = state.email
        user.address = state.address
        user.zip = state.zip
        user.phone = state.phone
        user.name = state.name
      }

      await axios.post(`/api/orders/place/${order.id}`, {
        stripeId: result.paymentIntent.id,
        user,
        order
      })
      // this.props.history.push(`/orderSuccess/${order.id}`)
      window.location.replace(`/orderSuccess/${user.id}?orderId=${order.id}`)
      // change
    }
  }

  ////https://stripe.com/docs/testing find test card numbers here
  render() {
    return (
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Shipping address</h4>
        <form
          onSubmit={this.handleSubmit}
          className="needs-validation"
          noValidate
        >
          <div className="d-flex flex-column">
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control "
                name="name"
                placeholder=""
                value={this.props.state.name}
                onChange={this.props.handleChange}
                required
              />
              <div className="invalid-feedback">Name is required.</div>
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder=""
                name="email"
                // value={state.email}
                placeholder="you@example.com"
                // onChange={handleChange}
                required
              />

              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="address"
                // value={state.address}
                placeholder="1234 Main St"
                // onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <div className="row ">
              <div className="col-md-3 mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  // value={state.phone}
                  // onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid phone number.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label>Zip</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  // value={state.zip}
                  // onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
          </div>
          <CardSection />
          <button
            className="btn btn-primary btn-lg btn-block"
            type="submit"
            disabled={!this.props.stripe}
          >
            Continue to checkout
          </button>
        </form>
      </div>
    )
  }
}

function DisInjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          order={props.order}
          user={props.user}
          state={props.state}
          updateuser={props.updateuser}
          handleChange={props.handleChange}
        />
      )}
    </ElementsConsumer>
  )
}
const mapState = state => ({})
const mapDispatch = dispatch => {
  return {
    updateuser: (id, info) => dispatch(updateUserThunk(id, info))
  }
}

const InjectedCheckoutForm = connect(null, mapDispatch)(DisInjectedCheckoutForm)

export default InjectedCheckoutForm
