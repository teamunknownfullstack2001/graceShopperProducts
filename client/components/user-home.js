import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProductDummy from './ProductDummy'
import Pagination from './Pagination'
// import {deleteProduct} from '../store/products'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
    this.page = 1
    this.state = {
      currentProducts: [],
      currentPage: null,
      totalPages: null
    }
    this.onPageChanged = this.onPageChanged.bind(this)

    // this.handleRemove = this.handleRemove.bind(this)
  }
  // componentDidMount() {
  //   this.props.fetchProducts()
  // }
  // handleRemove = productId => this.props.removeProduct(productId)

  onPageChanged = data => {
    const {products} = this.props
    const {currentPage, totalPages, pageLimit} = data

    const offset = (currentPage - 1) * pageLimit
    const currentProducts = products.slice(offset, offset + pageLimit)

    this.setState({currentPage, currentProducts, totalPages})
  }
  render() {
    const {email} = this.props
    const {currentProducts, currentPage, totalPages} = this.state
    const totalProducts = this.props.products ? this.props.products.length : 0

    if (totalProducts === 0) return null
    const headerClass = [
      'text-dark py-2 pr-4 m-0',
      currentPage ? 'border-gray border-right' : ''
    ]
      .join(' ')
      .trim()
    return (
      <div>
        {email ? <h3>Welcome, {email}</h3> : <h3>Welcome, shopper</h3>}

        <ul className="productList">
          {currentProducts
            ? currentProducts.map(product => (
                <div key={product.id} className="singleProduct">
                  <div>{product.id}</div>
                  <ProductDummy
                    product={product}
                    x="x"
                    action={this.handleRemove}
                  />
                </div>
              ))
            : 'No Products'}
        </ul>
        <div className="container mb-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalProducts}</strong>{' '}
                Products
              </h2>
              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> /{' '}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={totalProducts}
                pageLimit={10}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
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
