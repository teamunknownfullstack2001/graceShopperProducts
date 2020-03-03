import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    console.log('These are the props: ', this.props)
    const {product} = this.props
    const {id, imageUrl, name, description, price, tags, category} = product
    console.log('This is singleProduct', product)
    return (
      <div key={id}>
        <div className="singleProductContainer">
          <img src={imageUrl} className="singleProduct" />
        </div>
        <div className="singleProduct">
          <h1>{name}</h1>
          <p>{description}</p>
          <p>{price}</p>
          <p>{tags}</p>
          <p>{category}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('This is the state: ', state)
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
