import axios from 'axios'

/**
 * ACTION TYPES
 */

const ADMIN_GET_USERS = 'ADMIN_GET_USERS'
const ADMIN_GET_ORDERS = 'ADMIN_GET_ORDERS'

/**
 * ACTION CREATORS
 */

const adminGetUsers = users => ({type: ADMIN_GET_USERS, users})
const adminGetOrders = orders => ({type: ADMIN_GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */

export const getUserInfo = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(adminGetUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getOrderInfo = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(adminGetOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * INITIAL STATE
 */

const initialState = {
  users: [],
  orders: []
}

/**
 * REDUCER
 */

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return {...state, users: action.users}
    case ADMIN_GET_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

export default adminReducer
