import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, CreateProduct} from './components'
import {me, fetchProducts, getUserCart} from './store'
import InjectedCheckoutForm from './components/checkout-form'
import SingleProduct from './components/SingleProduct'
import Cart from './components/cart'
import placeOrder from './components/placeOrder'
import UserProfile from './components/UserProfile'
import OrderSuccessPage from './components/OrderSuccessPage'
import OrderHistory from './components/OrderHistory'
import ItemDetails from './components/ItemDetails'
import Error from './components/Error'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    const {isLoggedIn} = this.props
    const {user} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={UserHome} />
        <Route path="/Payment" component={InjectedCheckoutForm} />
        <Route path="/Cart/:id" component={Cart} />
        <Route path="/Order/:id" component={placeOrder} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/orderSuccess/:id" component={OrderSuccessPage} />
        <Route exact path="/" component={UserHome} />
        {isLoggedIn && (
          <Route path="/UserProfile/:id" component={UserProfile} />
        )}
        {isLoggedIn && (
          <Route path="/orderHistory/:id" component={OrderHistory} />
        )}
        {isLoggedIn && (
          <Route path="/itemDetails/:id" component={ItemDetails} />
        )}

        {isLoggedIn && user.type === 'admin' && (
          <Route exact path="/newproduct" component={CreateProduct} />
        )}
        {/* {isLoggedIn && (
          <Switch>
            <Route path="/UserProfile/:id" component={UserProfile} />
            <Route path="/orderHistory/:id" component={OrderHistory} />
            <Route path="/itemDetails/:id" component={ItemDetails} />
            {user.type === 'admin' && (
              <Route exact path="/newproduct" component={CreateProduct} />
            )}
          </Switch>
        )} */}
        {/* Displays our Login component as a fallback */}
        <Route path="/*" component={Error} />
        {/* <Redirect to="/404" /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchProducts())
    },
    getUserCart: id => {
      dispatch(getUserCart(id))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
