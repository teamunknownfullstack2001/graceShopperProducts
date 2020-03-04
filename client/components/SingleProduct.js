import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct, addToOrIncrementCart} from '../store'

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
const styles = {}

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    const {classes} = this.props
    const {product} = this.props
    const {id, imageUrl, name, description, price, tags, category} = product

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
            <p>Category: {category}</p>
            <p>Tags: {tags}</p>
            <Button
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                console.log('clicked')
                this.props.addToCart(this.props.user.id, product) //
              }}
              // id={1}
              // href={`/triviahimhers?id=${this.props.question.id}&type=vote`}
            >
              Add to Cart
            </Button>
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
    dispatch(addToOrIncrementCart(userId, product))
})

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleProduct))
