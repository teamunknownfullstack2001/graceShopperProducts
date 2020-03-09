import axios from 'axios'
import history from '../history'

const GET_USERCART = 'GET_USERCART'
const REMOVE_USERCART = 'REMOVE_USERCART'
const ADD_TO_OR_INCREMENT_CART = 'ADD_TO_OR_INCREMENT_CART'
const DECREMENT_CART = 'DECREMENT_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const EMPTY_CART = 'EMPTY_CART'

const defaultUSERCART = []

const gotUserCart = userCart => ({type: GET_USERCART, userCart})
const removeedUserCart = () => ({type: REMOVE_USERCART})
const addedToOrIncrementCart = products => ({
  type: ADD_TO_OR_INCREMENT_CART,
  products
})

const decrementedCart = products => ({
  type: ADD_TO_OR_INCREMENT_CART,
  products
})
const removedFromCart = products => ({
  type: REMOVE_FROM_CART,
  products
})

// /**
//  * THUNK CREATORS
//  */

export const getUserCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/carts/${userId}`)
    dispatch(gotUserCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const decrementCart = (userId, product) => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/carts/${userId}?type=decrement`,
      product
    )
    dispatch(decrementedCart(data.products))
  } catch (err) {
    console.error(err)
  }
}

export const addToOrIncrementCart = (userId, product) => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/carts/${userId}?type=createorincrement`,
      product
    )
    dispatch(addedToOrIncrementCart(data.products))
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCart = (userId, product) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/carts/${userId}?type=remove`, product)
    dispatch(removedFromCart(data.products))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_USERCART:
      return {
        cartId: action.userCart.id,
        products: action.userCart.products
      }
    case ADD_TO_OR_INCREMENT_CART:
      return {...state, products: action.products}
    case DECREMENT_CART:
      return {...state, products: action.products}
    case REMOVE_FROM_CART:
      return {...state, products: action.products}
    case EMPTY_CART:
      return {...state, products: []}
    default:
      return state
  }
}
