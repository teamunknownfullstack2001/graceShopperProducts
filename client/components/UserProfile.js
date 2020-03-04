import React from 'react'
import {connect} from 'react-redux'
import {getSingleUser} from '../store'

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }

  render() {
    console.log('These are the props: ', this.props)
    const {user} = this.props
    const {id, phone, userName} = user

    return (
      <div key={id}>
        <h1>{userName}</h1>
        <p>{phone}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('This is the state: ', state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleUser: id => dispatch(getSingleUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
