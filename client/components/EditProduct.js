import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct, putProduct, setProducts} from '../store'
import EditProductForm from './EditProductForm'
import Tag from './Tag'

class EditProduct extends Component {
  constructor(props) {
    super(props)
    this.handleModify = this.handleModify.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
    this.setState(this.props.product)
  }

  handleModify = event => {
    event.preventDefault()

    const productUpdates = {
      name: event.target.name.value,
      imageUrl: event.target.imageUrl.value,
      category: event.target.category.value,
      description: event.target.description.value,
      price: Math.floor(parseFloat(event.target.price.value) * 100),
      stock: event.target.stock.value
      // tags: [event.target.tags.value]
    }

    this.props.modifyProduct(this.props.product.id, productUpdates)
  }

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleReturnToProduct = () => {
    this.props.history.push(`/products/${id}`)
  }

  render() {
    const product = this.props.product

    return (
      <div>
        <div>
          <div>
            {product !== undefined && (
              <EditProductForm
                handleSubmit={this.handleModify}
                initialValues={product}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product,
  products: state.products
})

const mapDispatch = (dispatch, productProps) => ({
  getSingleProduct: id => dispatch(getSingleProduct(id)),
  modifyProduct: (id, productUpdates) =>
    dispatch(putProduct(id, productUpdates, productProps.history))
})

export default connect(mapState, mapDispatch)(EditProduct)
