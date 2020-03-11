import {CardSection} from '.'
import React, {useState} from 'react'
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import MDSpinner from 'react-md-spinner'
import {addEventListenToForms, regEx} from './utils.js'
import axios from 'axios'
import {updateUserThunk} from '../store'
function Loading(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Loading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Processing Payment! Don't close the window</Modal.Body>
        <div className="d-flex justify-content-center">
          <MDSpinner size={100} />
        </div>
      </Modal>
    </>
  )
}

class DisCheckoutForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      show: false,
      userName: props.user.userName,
      email: props.user.email,
      zip: props.user.zip,
      phone: props.user.phone,
      address: props.user.address
    }
    this.handleChange = this.handleChange.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    // if (props.user && state.nickname === 'placeholder') {
    if (
      props.user &&
      state.userName === 'Guest' &&
      props.user.userName !== 'Guest'
    ) {
      return {...props.user, show: false}
    } else {
      return state
    }
  }
  componentDidMount() {
    addEventListenToForms()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // eslint-disable-next-line complexity
  handleSubmit = async (event, regEx) => {
    event.preventDefault()
    const check = !(
      this.state.userName === '' ||
      this.state.address === '' ||
      !new RegExp(regEx.phone).test(this.state.phone) ||
      !new RegExp(regEx.email).test(this.state.email) ||
      !new RegExp(regEx.zip).test(this.state.zip) ||
      document.getElementsByClassName('StripeElement--complete').length !== 1
    )
    //if all the validations are correct it should go to the payment and update db
    if (check) {
      this.setState({show: true})
      const {stripe, elements, order, user, state} = this.props

      const inputShippingEmail = this.state.email
      const inputShippingAddress = this.state.address

      if (!stripe || !elements) {
        return
      }

      const paymentBody = {
        amount: Math.floor(order.total),
        currency: 'usd',
        metadata: {integration_check: 'accept_a_payment'}
      }
      const {data} = await axios.post(`/api/payment`, paymentBody)
      const card = elements.getElement(CardElement)

      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: card,
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

        // if (user.id === 0) {
        //   user.email = state.email
        //   user.address = state.address
        //   user.zip = state.zip
        //   user.phone = state.phone
        //   user.name = state.name
        // }
        const newUser = {
          userName: this.state.userName,
          address: this.state.address,
          phone: this.state.phone,
          zip: this.state.zip,
          email: this.state.email,
          id: user.id
        }

        await axios.post(`/api/orders/place/${order.id}`, {
          stripeId: result.paymentIntent.id,
          newUser,
          order,
          inputShippingAddress,
          inputShippingEmail
        })
        this.props.updateUser(user.id, newUser)
        window.location.replace(`/orderSuccess/${user.id}&${order.id}`)
      }
    }
  }

  ////https://stripe.com/docs/testing find test card numbers here
  render() {
    console.log('this.props', this.props)
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
                name="userName"
                placeholder=""
                value={this.state.userName}
                onChange={this.handleChange}
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
                pattern={regEx.email}
                value={this.state.email}
                placeholder="you@example.com"
                onChange={this.handleChange}
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
                value={this.state.address}
                placeholder="1234 Main St"
                onChange={this.handleChange}
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
                  pattern={regEx.phone}
                  value={this.state.phone}
                  onChange={this.handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid phone number (000-000-0000).
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label>Zip</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  id="zip"
                  value={this.state.zip}
                  pattern={regEx.zip}
                  onChange={this.handleChange}
                  placeholder=""
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

const mapState = state => ({})
const mapDispatch = dispatch => ({
  updateUser: (id, info) => {
    console.log('displaying thunk')
    dispatch(updateUserThunk(id, info))
  }
})
const CheckoutForm = connect(mapState, mapDispatch)(DisCheckoutForm)

function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          order={props.order}
          user={props.user}
          state={props.state}
          handleChange={props.handleChange}
        />
      )}
    </ElementsConsumer>
  )
}

export default InjectedCheckoutForm
