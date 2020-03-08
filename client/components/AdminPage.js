import React from 'react'
import {connect} from 'react-redux'
import {adminGetUsers, adminGetOrders} from '../store'

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.adminGetUsers()
    this.props.adminGetOrders()
  }
  render() {
    return <div>Welcome Admin!</div>
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => ({
  adminGetUsers: () => dispatch(adminGetUsers()),
  adminGetOrders: () => dispatch(adminGetOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
