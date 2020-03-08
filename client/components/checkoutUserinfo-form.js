import React from 'react'
import {connect} from 'react-redux'

class CheckoutUserinfo extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      password: '',
      email: '',
      address: '',
      zip: '',
      phone: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={name}>
          <label id="name-label">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </form>
      </div>
    )
  }
}

export default connect(null)(CheckoutUserinfo)
