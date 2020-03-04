import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store'
import Tag from './Tag'
// import projectReducer from '../../../junior-phase-final-project-2001/app/redux/project'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    console.log('These are the props: ', this.props)
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
            <p>Category: {category}</p>
          </div>
        </div>
        <div className="tagContainer">
          <h2>Tags: </h2>
          <div className="tagList">
            {product.tags && product.tags.length ? (
              product.tags.map(tag => (
                <div key={tag.id} className="tag">
                  <Tag tag={tag} />
                </div>
              ))
            ) : (
              <h2>NONE</h2>
            )}
          </div>
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
