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
    // const productUpdates = {
    //   name: event.target.name.value,
    //   imageUrl: event.target.imageUrl.value,
    //   category: event.target.category.value,
    //   description: event.target.description.value,
    //   price: Math.floor(parseFloat(event.target.price.value) * 100),
    //   stock: event.target.stock.value
    //   // tags: [event.target.tags.value]
    // }

    // this.props.modifyProduct(this.props.product.id, productUpdates)
  }

  render() {
    // console.log('These are the props: ', this.props)
    const {user} = this.props
    const {id, phone, userName, email, address, zip, updateInfo, orders} = user
    // console.log('User info: ', user)
    console.log('These are the orders: ', orders)

    return (
      <div key={id}>
        <div className="col-md-8 order-md-1">
          {/*<form onSubmit={this.handlesSubmit} className="needs-validation">
            <label className="mb-3" htmlFor="name">
              Name:
            </label>
            <input
              onChange={this.handlesChange}
              className="form-control"
              type="text"
              name="username"
              value={this.state.username}
              // defaultValue={initialValsFromProps('name', initialValues)}
            />
            <label className="mb-3" htmlFor="name">
              Email:
            </label>
            <input
              onChange={this.handlesChange}
              className="form-control"
              type="text"
              name="email"
              value={this.state.email}
              // defaultValue={initialValsFromProps('name', initialValues)}
            />
            <label className="mb-3" htmlFor="name">
              Address:
            </label>
            <input
              onChange={this.handlesChange}
              className="form-control"
              type="text"
              name="address"
              value={this.state.address}
              // defaultValue={initialValsFromProps('name', initialValues)}
            />
            <label className="mb-3" htmlFor="name">
              Zip:
            </label>
            <input
              onChange={this.handlesChange}
              className="form-control"
              type="text"
              name="zip"
              value={this.state.zip}
              // defaultValue={initialValsFromProps('name', initialValues)}
            />
            <label className="mb-3" htmlFor="name">
              Phone:
            </label>
            <input
              onChange={this.handlesChange}
              className="form-control"
              type="text"
              name="phone"
              value={this.state.phone}
              // defaultValue={initialValsFromProps('name', initialValues)}
            />
            <Button
              size="large"
              color="secondary"
              startIcon={<EditIcon />}
              type="submit"
            >
              Save CHange
            </Button>
    </form>*/}
          {/* <Button size="large">
            <Link to={`/orderHistory/${id}`}>Go To Order History</Link> */}
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
              <Link to={`/users/${id}/edit`}>
                <Button
                  size="large"
                  style={{textDecoration: 'none', color: 'black'}}

                  /*type="submit"
                onClick={updateInfo}*/
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
  // console.log('This is the state: ', state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleUser: id => dispatch(getSingleUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
