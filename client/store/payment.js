import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SUBMIT_PAYMENT = 'SUBMIT_PAYMENT'
/**
 * INITIAL STATE
 */
const defaultpayment = {}

/**
 * ACTION CREATORS
 */
const submittedPayment = payment => ({type: SUBMIT_PAYMENT, payment})
/**
 * THUNK CREATORS
 */
export const submitPayment = payment => async dispatch => {
  try {
    const {data} = await axios.get(`/api/payment`)
    dispatch(submittedPayment(data))
  } catch (error) {
    // return dispatch(getUser({error: authError}))
  }
}
/**
 * REDUCER
 */
export default function(state = defaultpayment, action) {
  switch (action.type) {
    case SUBMIT_PAYMENT:
      return action.payment
    default:
      return state
  }
}
