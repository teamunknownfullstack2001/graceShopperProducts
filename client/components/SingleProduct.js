import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct, addToOrIncrementCart, deleteProduct} from '../store'
import Tag from './Tag'

import {withStyles} from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
const styles = {}

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }
  handleRemove = async productId => {
    await this.props.removeProduct(productId)

    this.props.history.push('/products')
  }

  handleEdit = id => {
    this.props.history.push(`/products/${id}/edit`)
  }

  render() {
    const {classes} = this.props
    const {product} = this.props
    const {id, imageUrl, name, description, price, category, stock} = product

    return (
      <div key={id}>
        <div className="singleProductContainer">
          <div className="singleProductImg">
            <img src={imageUrl} className="productImg" />
          </div>
          <div className="singleProduct">
            <h1>
              <i>{name}</i>
            </h1>
            <p>{`$ ${(price / 100).toFixed(2)}`}</p>
            {stock < 10 ? (
              <p className="text-danger"> Only {stock} left!-order soon.</p>
            ) : (
              ''
            )}
            <p>{description}</p>
            <p>
              Category:
              <Button> {category}</Button>
            </p>
          </div>
          <div className="singleProductButtons">
            {this.props.user.type === 'admin' && (
              <Button
                size="large"
                color="secondary"
                startIcon={<DeleteForeverIcon />}
                onClick={() => {
                  this.handleRemove(product.id)
                }}
              >
                Delete
              </Button>
            )}
            {this.props.user.type === 'admin' && (
              <Button
                size="large"
                color="secondary"
                startIcon={<DeleteForeverIcon />}
                onClick={() => {
                  this.handleEdit(product.id)
                }}
              >
                Edit Product
              </Button>
            )}{' '}
            <Button
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                console.log('clicked')
                this.props.addToCart(this.props.user.id, product)
              }}
            >
              Add to Cart
            </Button>
            <Button
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                console.log('clicked')
                this.props.addToCart(this.props.user.id, product)
                window.location.replace(`/Cart/${this.props.user.id}`)
              }}
            >
              Add and go to Cart
            </Button>
          </div>
        </div>
        <div className="tagContainer">
          <div className="tag">
            <p>Tags: </p>
          </div>
          <div className="tagList">
            {product.tags && product.tags.length ? (
              product.tags.map(tag => (
                <div key={tag.id} className="tag">
                  <Tag tag={tag} />
                </div>
              ))
            ) : (
              <div className="tag">
                <p>NONE</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    product: state.product
  }
}

const mapDispatch = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProduct(id)),
  addToCart: (userId, product) =>
    dispatch(addToOrIncrementCart(userId, product)),
  removeProduct: productId => dispatch(deleteProduct(productId))
})

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleProduct))
