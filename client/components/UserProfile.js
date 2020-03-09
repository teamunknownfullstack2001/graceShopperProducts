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
      <div key={id} className="singleProductContainer">
        <div className="singleProductMain">
          <p>
            <i>User name: </i>
            {userName}
          </p>
          <p>
            <i>Phone Number: </i>
            {phone}
          </p>
          <p>
            <i>Email: </i>
            {email}
          </p>
          <p>
            <i>Address: </i>
            {address}
          </p>
          <p>
            <i>Zip: </i>
            {zip}
          </p>
        </div>
        <div className="singleProductButtons">
          <Link to={`/orderHistory/${id}`}>
            <Button
              size="large"
              style={{textDecoration: 'none', color: 'black'}}
            >
              Order History
            </Button>
          </Link>
          <Button
            size="large"
            style={{textDecoration: 'none', color: 'black'}}
            type="submit"
            onClick={updateInfo}
          >
            Update Info
          </Button>
        </div>
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
