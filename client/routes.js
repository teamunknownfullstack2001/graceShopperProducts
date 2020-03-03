import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me, fetchProducts, getUserCart} from './store'
import InjectedCheckoutForm from './components/checkout-form'
import SingleProduct from './components/SingleProduct'
import Cart from './components/cart'
import UserProfile from './components/UserProfile'

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
    console.log(this.state)
    // debugger

    // this.props.getUserCart(1)
    this.props.fetchProducts()
  }
  // static getDerivedStateFromProps(props, state) {
  //   if (state.user !== null) {
  //     // console.log('did modify state from props')
  //     // props.getUserCart(state.user.id)
  //     return state
  //   } else {
  //     // console.log('did not modify state from props')
  //     return state
  //   }
  // }
  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={UserHome} />
        <Route path="/Payment" component={InjectedCheckoutForm} />

        <Route path="/Cart/:id" component={Cart} />

        <Route path="/products/:id" component={SingleProduct} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
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
    },
    getUserCart: id => {
      dispatch(getUserCart(id))
    },
    fetchProducts: () => dispatch(fetchProducts())
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
