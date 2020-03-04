import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'

/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: GET_ORDER, order})

/**
 * THUNK CREATORS
 */

export const getOrderHistory = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orderHistory/${id}`)
      dispatch(getOrder(data))
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
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}

export default orderReducer
