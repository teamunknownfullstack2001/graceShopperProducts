import React from 'react'
import axios from 'axios'
import {CreateProductForm} from '.'
import {postProduct} from '../store/products'
import {connect} from 'react-redux'

const CreateProduct = props => {
  const {addProduct} = props

  const handleSubmit = event => {
    event.preventDefault()

    const newProduct = {
      name: event.target.name.value,
      imageUrl: event.target.imageUrl.value,
      category: event.target.category.value,
      description: event.target.description.value,
      price: Math.floor(parseFloat(event.target.price.value) * 100),
      stock: event.target.stock.value
    }
    addProduct(newProduct)
  }
  return (
    <div>
      <CreateProductForm onSubmit={handleSubmit} />
    </div>
  )
}

const mapDispatchToProps = (dispatch, productProps) => ({
  addProduct: newProduct =>
    dispatch(postProduct(newProduct, productProps.history))
})

export default connect(null, mapDispatchToProps)(CreateProduct)
