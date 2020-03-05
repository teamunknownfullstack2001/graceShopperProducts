import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct, addToOrIncrementCart, deleteProduct} from '../store'
import Tag from './Tag'
// import projectReducer from '../../../junior-phase-final-project-2001/app/redux/project'

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
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }
  handleRemove = async productId => {
    await this.props.removeProduct(productId)

    this.props.history.push('/products')
  }

  render() {
    const {classes} = this.props
    const {product} = this.props
    const {id, imageUrl, name, description, price, category} = product

    console.log('This is singleProduct', product)

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
            <p>${price}</p>
            <p>{description}</p>
            <p>
              Category:
              <Button> {category}</Button>
            </p>
          </div>
          <div className="singleProductButtons">
            <Button
              size="large"
              color="secondary"
              startIcon={<DeleteForeverIcon />}
              onClick={() => {
                this.handleRemove(product.id)
              }}
              // id={1}
              // href={`/triviahimhers?id=${this.props.question.id}&type=vote`}
            >
              Delete
            </Button>
            <Button
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                console.log('clicked')
                this.props.addToCart(this.props.user.id, product)
              }}
              // id={1}
              // href={`/triviahimhers?id=${this.props.question.id}&type=vote`}
            >
              Add to Cart
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
