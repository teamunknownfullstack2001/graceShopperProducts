import React from 'react'
import PropTypes from 'prop-types'
import {Tag} from '.'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchTag} from '../store'

class TagProducts extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchTag(this.props.match.params.id)
  }

  render() {
    const {tag} = this.props

    return (
      <div>
        <ul>
          <h2>
            <i>{tag.name} Friends</i>
          </h2>
          {tag.products && tag.products.length
            ? tag.products.map(product => (
                <Link
                  to={`/products/${product.id}`}
                  style={{textDecoration: 'none', color: 'black'}}
                >
                  <div key={product.id}>
                    <div className="singleProductContainer">
                      <div className="singleProductImg">
                        <img
                          src={product.imageUrl}
                          alt={`Image: ${product.imageUrl}`}
                          className="productImg"
                        />
                      </div>
                      <div className="singleProduct">
                        <h1>
                          <i>{product.name}</i>
                        </h1>
                        <p>{`$ ${(product.price / 100).toFixed(2)}`}</p>
                        {product.stock < 10 && product.stock !== 0 ? (
                          <p className="text-danger">
                            {' '}
                            Only {product.stock} left! Order soon.
                          </p>
                        ) : (
                          ''
                        )}
                        {product.stock === 0 ? (
                          <p className="text-danger"> Out of Stock!</p>
                        ) : (
                          ''
                        )}
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : 'No Friends'}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tag: state.tag,
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchTag: id => dispatch(fetchTag(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagProducts)
