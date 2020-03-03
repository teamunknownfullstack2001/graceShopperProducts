import React from 'react'
import connect from 'reat-redux'
// import {getSingleUser} from '../store'

class UserProfile extends React.Component {
  componentDidMount() {
    // this.props.getSingleUser(this.props.match.params.id)
    this.props.me(this.props.match.params.id)
  }

  render() {
    console.log('These are the props: ', this.props)
    return <div>something</div>
  }
}

const mapStateToProps = state => {
  console.log('This is the state: ', state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  // getSingleUser = id => dispatch(getSingleUser(id))
}

// export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
