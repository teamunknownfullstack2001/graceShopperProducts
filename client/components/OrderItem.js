import React from 'react'

export default function OrderItem(props) {
  const {products} = props
  return (
    <div className='"col-md-4 order-md-2 mb-4"'>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your cart</span>
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
              <small className=" text-muted ">
                {product.description.slice(0, 20)}
              </small>
            </div>
            <span className="text-muted">
              ${(product.price / 100).toFixed(2)}
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
