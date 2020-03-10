import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {withRouter} from 'react-router'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import {updateUserThunk, adminUpdateUsersThunk} from '../store'
const styles = {}

class DisEditUserForm extends React.Component {
  constructor(props) {
    super()
    this.state =
      props.match && props.match.path.includes('admin')
        ? {...props.location.initialValues}
        : {...props.initialValues}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log('typing', event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event, regEx) => {
    event.preventDefault()
    const check = !(
      this.state.userName === '' ||
      this.state.address === '' ||
      !new RegExp(regEx.email).test(this.state.email) ||
      !new RegExp(regEx.phone).test(this.state.phone) ||
      !new RegExp(regEx.zip).test(this.state.zip)
    )
    console.log('check', check)
    if (this.props.match && this.props.match.path.includes('admin')) {
      check && this.props.adminUpdateUsers(this.state.id, this.state)
      check && this.props.history.push(`/adminPageUser/`)
    } else {
      check && this.props.updateUser(this.state.id, this.state)
      check && this.props.history.push(`/userProfile/${this.state.id}`)
    }
  }
  render() {
    const regEx = {
      email: '^[A-Za-z0-9.-_]+@[A-Za-z0-9]+.[A-Za-z0-9]+$',
      phone: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$',
      zip: '^[0-9]{5}$'
    }
    return (
      <div className="col-md-8 order-md-1">
        <form
          onSubmit={event => {
            this.handleSubmit(event, regEx)
          }}
          className="needs-validation"
          noValidate
        >
          <div className="d-flex flex-column">
            <div className="mb-3">
              <label>Name:</label>
              <input
                className="form-control"
                type="text"
                name="userName"
                required
                id="userName"
                value={this.state.userName}
                onChange={this.handleChange}
              />
              <div className="invalid-feedback">Name is required.</div>
            </div>
            <div className="mb-3">
              <label>Email:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                required
                pattern={regEx.email}
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div className="mb-3">
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                name="address"
                required
                id="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
              <div className="invalid-feedback">Address cannot be empty</div>
            </div>
            <div className="mb-3">
              <label>Zip:</label>
              <input
                className="form-control"
                type="text"
                name="zip"
                required
                id="zip"
                pattern={regEx.zip}
                value={this.state.zip}
                onChange={this.handleChange}
              />
              <div className="invalid-feedback">
                Zip code needs to be 5-digit
              </div>
            </div>
            <div className="mb-3">
              <label>Phone:</label>
              <input
                className="form-control"
                type="text"
                name="phone"
                required
                pattern={regEx.phone}
                id="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
              <div className="invalid-feedback">
                Please enter a valid phone number (000-000-0000).
              </div>
            </div>
            <Button
              size="large"
              color="secondary"
              startIcon={<EditIcon />}
              type="submit"
            >
              Save Change
            </Button>
          </div>
        </form>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    updateUser: (id, info) => dispatch(updateUserThunk(id, info)),
    adminUpdateUsers: (id, info) => dispatch(adminUpdateUsersThunk(id, info))
  }
}

const EditUserForm = withRouter(connect(null, mapDispatch)(DisEditUserForm))

export default EditUserForm
