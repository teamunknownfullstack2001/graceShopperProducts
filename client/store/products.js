import axios from 'axios'
import history from '../history'

// action types
export const SET_PRODUCTS = 'SET_PRODUCTS'

// action creators
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products: products
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

const initialState = []
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
export default productsReducer
