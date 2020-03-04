import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store'

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
    console.log('These are the props: ', this.props)
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
  console.log('This is the state: ', state)
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProduct(id))
})

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleProduct))
