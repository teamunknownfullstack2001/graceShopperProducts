import React from 'react'
import {connect} from 'react-redux'
import {getSingleUser} from '../store'
import {Link} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
class UserProfile extends React.Component {
  constructor() {
    super()
    this.handlesSubmit = this.handlesSubmit.bind(this)
    this.handlesChange = this.handlesChange.bind(this)
    this.state = {
      username: '',
      email: 'placeholder@placeholder.com'
    }
  }

  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }

  static getDerivedStateFromProps(props, state) {
    console.dir('getDerivedStateFromProps')
    console.dir(props)
    if (props.user && state.email === 'placeholder@placeholder.com') {
      // if (props.user) {
      return props.user
    } else {
      return state
      // }
    }
  }

  handlesChange(event) {
    console.log('typing', event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handlesSubmit = event => {
    event.preventDefault()
    console.log('update user')
  }

  render() {
    // console.log('These are the props: ', this.props)
    const {user} = this.props
    const {
      id,
      phone,
      userName,
      email,
      address,
      zip,
      updateInfo,
      orders,
      type
    } = user
    console.log('These are the orders: ', orders)

    return (
      <div key={id} className="standardContainer">
        <div>
          <div key={id} className="userHistory">
            <div className="userHistorytMain">
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
              <p>
                <i>Type: </i>
                {type}
              </p>
            </div>
            <div className="userHistoryButtons">
              <Link to={`/orderHistory/${id}`}>
                <Button
                  size="large"
                  style={{textDecoration: 'none', color: 'black'}}
                >
                  Order History
                </Button>
              </Link>
              <Link to={`/users/${id}/edit`}>
                <Button
                  size="large"
                  style={{textDecoration: 'none', color: 'black'}}
                >
                  Update Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleUser: id => dispatch(getSingleUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
