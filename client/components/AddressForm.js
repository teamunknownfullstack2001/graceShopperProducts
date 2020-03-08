import React from 'react'

export default class AddressForm extends React.Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.state.name = this.props.user.userName || ''
      this.props.state.email = this.props.user.email
      this.props.state.address = this.props.user.address || ''
      this.props.state.zip = this.props.user.zip || ''
      this.props.state.phone = this.props.user.phone || ''
    }
    console.log('in address form compoenet', this.props.user)
  }
  render() {
    const {handleChange, state} = this.props
    console.log('in the render', this.props.state)
    return (
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Shipping address</h4>

        <form className="needs-validation" noValidate>
          <div className="d-flex flex-column">
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control "
                name="name"
                placeholder=""
                value={state.name}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Valid Name is required.</div>
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder=""
                name="email"
                value={state.email}
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />

              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="address"
                value={state.address}
                placeholder="1234 Main St"
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <div className="row ">
              <div className="col-md-3 mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={state.phone}
                  onChange={handleChange}
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
                  name="zip"
                  value={state.zip}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
