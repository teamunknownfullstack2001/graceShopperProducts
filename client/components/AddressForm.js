import React from 'react'

export default class AddressForm extends React.Component {
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
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  componentDidMount() {
    this.setState({
      name: this.props.user.userName || '',
      email: this.props.user.email,
      address: this.props.user.address || '',
      zip: this.props.user.zip || '',
      phone: this.props.user.phone || ''
    })
  }
  render() {
    return (
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                value=""
                onChange={this.handleChange}
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder=""
                value=""
                placeholder="you@example.com"
                onChange={this.handleChange}
                required
              />

              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value=""
                placeholder="1234 Main St"
                onChange={this.handleChange}
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="1234 Main St"
              onChange={this.handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid phone number.
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label>Zip</label>
            <input
              type="text"
              className="form-control"
              id="zip"
              placeholder=""
              onChange={this.handleChange}
              required
            />
            <div className="invalid-feedback">Zip code required.</div>
          </div>
        </form>
      </div>
    )
  }
}
