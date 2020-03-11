import {CardSection} from '.'
import React, {useState} from 'react'
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import MDSpinner from 'react-md-spinner'
import {addEventListenToForms, regEx} from './utils.js'
import axios from 'axios'

function Loading(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Processing Payment! Don't close the window</Modal.Body>
        <MDSpinner className="justify-content-center" size={100} />
      </Modal>
    </>
  )
}

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  componentDidMount() {
    addEventListenToForms()
  }

  handleSubmit = async (event, regEx) => {
    event.preventDefault()

    //check the user input
    const check = !(
      this.props.state.userName === '' ||
      this.props.state.address === '' ||
      !new RegExp(regEx.phone).test(this.props.state.phone) ||
      !new RegExp(regEx.email).test(this.props.state.email) ||
      !new RegExp(regEx.zip).test(this.props.state.zip)
    )
    //if all the validations are correct it should go to the payment and update db
    if (check) {
      this.setState({show: true})
      const {stripe, elements, order, user, state} = this.props

      const inputShippingEmail = this.props.state.email
      const inputShippingAddress = this.props.state.address

      if (!stripe || !elements) {
        return
      }

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
          order,
          inputShippingAddress,
          inputShippingEmail
        })
      }

      // window.location.replace(`/orderSuccess/${user.id}&${order.id}`)
    }
  }

  ////https://stripe.com/docs/testing find test card numbers here
  render() {
    return (
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Shipping address</h4>
        <form
          onSubmit={event => {
            this.handleSubmit(event, regEx)
          }}
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
                value={this.props.state.email}
                placeholder="you@example.com"
                onChange={this.props.handleChange}
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
                value={this.props.state.address}
                placeholder="1234 Main St"
                onChange={this.props.handleChange}
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
                  value={this.props.state.phone}
                  onChange={this.props.handleChange}
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
                  id="zip"
                  value={this.props.state.zip}
                  pattern={regEx.zip}
                  onChange={this.props.handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Zip code needs to be 5-digit.
                </div>
              </div>
            </div>
          </div>
          <h4 className="mb-3">Payment</h4>
          <CardSection />
          <button
            className="btn btn-primary btn-lg btn-block"
            type="submit"
            disabled={!this.props.stripe}
          >
            Continue to checkout
          </button>
        </form>

        <Loading show={this.state.show} />
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
const mapDispatch = dispatch => ({})

const InjectedCheckoutForm = connect(
  mapState,
  mapDispatch
)(DisInjectedCheckoutForm)

export default InjectedCheckoutForm
