import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct, addToOrIncrementCart, deleteProduct} from '../store'
import {Tag, Popup} from '.'

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
import EditIcon from '@material-ui/icons/Edit'
const styles = {}

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      seen: false
    }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.togglePop = this.togglePop.bind(this)
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }
  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    })
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
      <div key={id} className="standardContainer">
        <div className="singleProductContainer">
          <div className="singleProductImg">
            <img
              src={imageUrl}
              alt={`Image: ${imageUrl}`}
              className="productImg"
            />
          </div>
          <div className="singleProductMain">
            <h1>
              <i>{name}</i>
            </h1>
            <p>{`$${(price / 100).toFixed(2)} / week`}</p>
            {stock < 10 && stock !== 0 ? (
              <p className="text-danger"> Only {stock} left!-order soon.</p>
            ) : (
              ''
            )}
            {stock === 0 ? <p className="text-danger"> Out of Stock!</p> : ''}
            {this.props.user.type === 'admin' && (
              <p>
                <i>stock: </i>
                {stock}
              </p>
            )}
            <p>{description}</p>
            <p>
              <i>category: </i>
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
                Delete Friend
              </Button>
            )}
            {this.props.user.type === 'admin' && (
              <Button
                size="large"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={() => {
                  this.handleEdit(product.id)
                }}
              >
                Edit Friend
              </Button>
            )}{' '}
            <div>
              <Button
                size="large"
                startIcon={<AddShoppingCartIcon />}
                disabled={stock === 0}
                onClick={() => {
                  this.props.addToCart(this.props.user.id, product)
                  this.togglePop()
                }}
              >
                Add to Cart
              </Button>
            </div>
            <Button
              size="large"
              startIcon={<AddShoppingCartIcon />}
              disabled={stock === 0}
              onClick={() => {
                this.props.addToCart(this.props.user.id, product)
                window.location.replace(`/Cart/${this.props.user.id}`)
              }}
            >
              Add & Go To Cart
            </Button>
          </div>
        </div>
        <div className="tagContainer">
          <div className="tagLabel">
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
          {this.state.seen ? <Popup toggle={this.togglePop} /> : null}
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
  addToCart: (userId, product) => {
    dispatch(addToOrIncrementCart(userId, product))
  },
  removeProduct: productId => dispatch(deleteProduct(productId))
})

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleProduct))
