import axios from 'axios'
import history from '../history'

// action types
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const ADD_PRODUCT = 'ADD_PRODUCT'

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

// action creators
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products: products
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product: product
})

export const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId: productId
})

//  thunks
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (error) {
      console.error('GET Error')
    }
  }
}

export const postProduct = (newProduct, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', newProduct)
      dispatch(addProduct(data))
      history.push(`/products/${data.id}`)
    } catch (error) {
      console.error('POST Error')
    }
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      console.log('deleteProduct')
      await axios.delete(`/api/products/${productId}`)
      dispatch(removeProduct(productId))
    } catch (error) {
      console.error(`${productId} DELETE Error`)
    }
  }
}

const initialState = []
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
export default productsReducer
