import React from 'react'
import {Link} from 'react-router-dom'

const ProductDummy = props => {
  const {product} = props

  return (
    <div>
      <Link
        to={`/products/${product.id}`}
        style={{textDecoration: 'none', color: 'black'}}
      >
        <div key={product.id} className="productCard">
          <div className="imgContainer">
            <img
              src={product.imageUrl}
              alt={`Image: ${product.imageUrl}`}
              className="productImg"
            />
          </div>
          <h3>
            <i>{product.name}</i>
          </h3>
          <h3>{`$ ${(product.price / 100).toFixed(2)}`}</h3>
        </div>
      </Link>
    </div>
  )
}

export default ProductDummy
