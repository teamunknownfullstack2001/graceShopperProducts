import React from 'react'
import {connect} from 'react-redux'
import {getSingleUser} from '../store'
import {Link} from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }

  render() {
    // console.log('These are the props: ', this.props)
    const {user} = this.props
    const {id, phone, userName, email, address, zip, updateInfo, orders} = user
    // console.log('User info: ', user)
    console.log('These are the orders: ', orders)

    return (
      <div key={id}>
        <h1>User name: {userName}</h1>
        <h1>Phone Number: {phone}</h1>
        <h2>Email: {email}</h2>
        <h2>Address: {address}</h2>
        <h2>Zip: {zip}</h2>

        <Button size="large">
          <Link to={`/orderHistory/${id}`}>Order History</Link>
        </Button>
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
