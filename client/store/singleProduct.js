import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_Product'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_SINGLE_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const getSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * INITIAL STATE
 */

const initialState = {}

/**
 * REDUCER
 */
const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProductReducer
