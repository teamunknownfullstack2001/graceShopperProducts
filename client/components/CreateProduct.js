import React from 'react'
import axios from 'axios'
import CreateProductForm from './CreateProductForm'
import {postProduct} from '../script/products'
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
      price: event.target.price.value,
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

const mapDispatchToProps = dispatch => ({
  addProduct: newProduct => dispatch(postProduct(newProduct))
})

export default connect(null, mapDispatchToProps)(CreateProduct)
