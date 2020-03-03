import axios from 'axios'
import history from '../history'

const GET_USERCART = 'GET_USERCART'
const REMOVE_USERCART = 'REMOVE_USERCART'

const defaultUSERCART = []

const gotUserCart = userCart => ({type: GET_USERCART, userCart})
const removeedUserCart = () => ({type: REMOVE_USERCART})

// /**
//  * THUNK CREATORS
//  */

export const getUserCart = id => async dispatch => {
  let res
  try {
    const {data} = await axios.get(`/api/carts/${id}`)
    console.log(data)
    dispatch(gotUserCart(data[0].products))
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
      return [...action.userCart]
    default:
      return state
  }
}
