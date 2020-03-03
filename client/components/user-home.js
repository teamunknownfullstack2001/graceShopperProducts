import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProductDummy from './ProductDummy'
import {deleteProduct} from '../store/products'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {products} = props
  const {removeProduct} = props

  const handleRemove = productId => removeProduct(productId)

  return (
    <div>
      {email ? <h3>Welcome, {email}</h3> : <h3>Welcome, shopper</h3>}
      <ul className="productList">
        {products
          ? products.map(product => (
              <div key={product.id} className="singleProduct">
                <ProductDummy product={product} x="x" action={handleRemove} />
              </div>
            ))
          : 'No Products'}
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    products: state.products
  }
}

const mapDispatch = dispatch => ({
  removeProduct: productId => dispatch(deleteProduct(productId))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
