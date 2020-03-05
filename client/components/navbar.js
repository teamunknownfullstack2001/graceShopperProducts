import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <h1>All The Cozies Zzzzz..</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/Products">Products</Link>
          <Link to="/payment">Payment</Link>
          <Link to={`/Cart/${user.id}`}>Cart</Link>
          <Link to={`/UserProfile/${user.id}`}>My Profile</Link>
          <Link to="/newproduct">Add Product</Link>
          {/* <Link to={`/OrderHistory/${user.id}`}>My Order History</Link> */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/Products">Products</Link>
          <Link to="/payment">Payment</Link>
          <Link to={`/Cart/${user.id}`}>Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {user: state.user, isLoggedIn: !!state.user.id}
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
