import React from 'react'
import {Link} from 'react-router-dom'

const ProductDummy = props => {
  const {product} = props

  return (
    <div className="productCard">
      <Link
        to={`/products/${product.id}`}
        style={{textDecoration: 'none', color: 'black'}}
      >
        <div key={product.id}>
          <img src={product.imageUrl} className="productImg" />
          <h3>{product.name}</h3>
        </div>
      </Link>
    </div>
  )
}

export default ProductDummy
