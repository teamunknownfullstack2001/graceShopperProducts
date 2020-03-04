import axios from 'axios'
import history from '../history'

const GET_USERCART = 'GET_USERCART'
const REMOVE_USERCART = 'REMOVE_USERCART'
const ADD_TO_CART = 'ADD_TO_CART'

const defaultUSERCART = []

const gotUserCart = userCart => ({type: GET_USERCART, userCart})
const removeedUserCart = () => ({type: REMOVE_USERCART})
const addedToCart = productId => ({type: ADD_TO_CART, productId})

// /**
//  * THUNK CREATORS
//  */

export const getUserCart = userId => async dispatch => {
  try {
    console.log('get card from user', userId)
    const {data} = await axios.get(`/api/carts/${userId}`)
    console.log(data)
    dispatch(gotUserCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const addToCart = (userId, product) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/carts/${userId}`, product)
    console.log(data)
    dispatch(addedToCart(data))
  } catch (err) {
    console.error(err)
  }
}

//   try {
//     dispatch(getUSERCART(res.data))
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(removeUSERCART())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultUSERCART, action) {
  switch (action.type) {
    case GET_USERCART:
      return [...action.userCart.products]
    case ADD_TO_CART:
      return state
    default:
      return state
  }
}
