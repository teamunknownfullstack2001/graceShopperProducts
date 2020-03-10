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
  handleSubmit = event => {
    event.preventDefault()

    if (this.props.match && this.props.match.path.includes('admin')) {
      this.props.adminUpdateUsers(this.state.id, this.state)
      this.props.history.push(`/adminPageUser/`)
    } else {
      this.props.updateUser(this.state.id, this.state)
      this.props.history.push(`/userProfile/${this.state.id}`)
    }
  }
  render() {
    return (
      <div className="col-md-8 order-md-1">
        <form
          onSubmit={this.handleSubmit}
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
                // value={this.props.state.name}
                onChange={this.handleChange}
                required
              />
              <div className="invalid-feedback">Name is required.</div>
            </div>
          </div>

          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Continue to checkout
          </button>
        </form>

        <form
          onSubmit={this.handleSubmit}
          className="needs-validation"
          noValidate
        >
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
          <label className="mb-3" htmlFor="email">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label className="mb-3" htmlFor="address">
            Address:
          </label>
          <input
            className="form-control"
            type="text"
            name="address"
            required
            onChange={this.handleChange}
            value={this.state.address}
          />
          <label className="mb-3" htmlFor="zip">
            Zip:
          </label>
          <input
            className="form-control"
            type="text"
            name="zip"
            required
            onChange={this.handleChange}
            value={this.state.zip}
          />
          <label className="mb-3" htmlFor="phone">
            Phone:
          </label>
          <input
            className="form-control"
            type="text"
            name="phone"
            required
            onChange={this.handleChange}
            value={this.state.phone}
          />
          <Button
            size="large"
            color="secondary"
            startIcon={<EditIcon />}
            type="submit"
          >
            Save Change
          </Button>
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
