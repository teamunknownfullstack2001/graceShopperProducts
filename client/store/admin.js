import axios from 'axios'

/**
 * ACTION TYPES
 */

const ADMIN_GET_USERS = 'ADMIN_GET_USERS'
const ADMIN_UPDATE_USERS = 'ADMIN_UPDATE_USERS'
const ADMIN_DELETE_USER = 'ADMIN_DELETE_USER'

const ADMIN_GET_ORDERS = 'ADMIN_GET_ORDERS'

/**
 * ACTION CREATORS
 */

const adminGetUsers = users => ({type: ADMIN_GET_USERS, users})
const adminUpdateUsers = user => ({type: ADMIN_UPDATE_USERS, user})
const adminDeleteUser = id => ({type: ADMIN_DELETE_USER, id})
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

export const adminUpdateUsersThunk = (id, info) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${id}`, info)

      dispatch(adminUpdateUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const adminDeleteUserThunk = (id, info) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/users/${id}`, info)

      dispatch(adminDeleteUser(data.id))
    } catch (error) {
      console.error(error)
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
      return {...state, users: action.users.sort((a, b) => a.id - b.id)}
    case ADMIN_UPDATE_USERS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.user.id ? action.user : user
        )
      }
    case ADMIN_DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter(user => +user.id !== +action.id)]
      }
    case ADMIN_GET_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

export default adminReducer
