import React from 'react'
import {connect} from 'react-redux'
import {getSingleUser} from '../store'

class OrderSuccessPage extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }

  render() {
    console.log('These are the props: ', this.props)
    const {user} = this.props
    return (
      <div>
        <h1>
          Thank you for your order {user.userName}. Your order ID is . Your
          order will be shipped to {user.address}. You will also receive email
          receipt at {user.email}
        </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccessPage)
