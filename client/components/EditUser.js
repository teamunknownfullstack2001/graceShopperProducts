import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleUser, putUser} from '../store'
import {EditUserForm} from '.'

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.handleModify = this.handleModify.bind(this)
  }

  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
    this.setState(this.props.user)
  }

  handleModify = event => {
    event.preventDefault()

    const userUpdates = {
      userName: event.target.userName.value,
      email: event.target.email.value,
      address: event.target.address.value,
      zip: event.target.zip.value,
      phone: event.target.phone.value
    }

    this.props.modifyUser(this.props.user.id, userUpdates)
  }

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleReturnToUser = () => {
    this.props.history.push(`/UserProfile/${id}`)
  }

  render() {
    const user = this.props.user

    return (
      <div>
        <div>
          <div>
            <EditUserForm
              handleSubmit={this.handleModify}
              initialValues={user}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  users: state.users
})

const mapDispatch = (dispatch, userProps) => ({
  getSingleUser: id => dispatch(getSingleUser(id)),
  modifyUser: (id, userUpdates) =>
    dispatch(putUser(id, userUpdates, userProps.history))
})

export default connect(mapState, mapDispatch)(EditUser)
