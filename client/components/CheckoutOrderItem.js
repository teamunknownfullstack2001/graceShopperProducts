import React from 'react'

export default function CheckoutOrderItem(props) {
  const {products} = props
  return (
    <div className="col-md-4 order-md-2 mb-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Order Summary </span>
        <span className="badge badge-secondary badge-pill">
          {products.length}
        </span>
      </h4>
      <ul className="list-group mb-3">
        {products.map(product => (
          <li
            className="list-group-item d-flex justify-content-between lh-condensed"
            key={product.id}
          >
            <div>
              <h6 className="my-0">{product.name}</h6>

              <small className=" text-muted ">{product.description}</small>
            </div>
            <span className="  font-weight-bold text-muted">
              ${(product.price / 100).toFixed(2)}
              <p className=" text-right font-weight-normal">
                {'Qty ' + product.orderproduct.quantity}
              </p>
            </span>
          </li>
        ))}

        <li className="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>{props.total}</strong>
        </li>
      </ul>
    </div>
  )
}
