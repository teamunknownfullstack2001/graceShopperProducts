import axios from 'axios'
import history from '../history'
import {act} from 'react-test-renderer'

// action types
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const ADD_PRODUCT = 'ADD_PRODUCT'

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

export const MODIFY_PRODUCT = 'MODIFY_PRODUCT'

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

export const modifyProduct = product => ({
  type: MODIFY_PRODUCT,
  product: product
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
      await axios.delete(`/api/products/${productId}`)
      dispatch(removeProduct(productId))
    } catch (error) {
      console.error(`${productId} DELETE Error`)
    }
  }
}

export const putProduct = (id, productUpdates, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${id}`, productUpdates)
      dispatch(modifyProduct(data))
      history.push(`/products/${id}`)
    } catch (error) {
      console.error(`PUT fail products/${id}`)
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
    case MODIFY_PRODUCT: {
      const otherProducts = state.map(product => {
        if (product.id === action.product.id) {
          return action.product
        }
        return product
      })
      return otherProducts
    }
    default:
      return state
  }
}
export default productsReducer
