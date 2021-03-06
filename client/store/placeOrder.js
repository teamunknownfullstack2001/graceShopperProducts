import axios from 'axios'

const GET_ORDER = 'GET_ORDER'
const CREAT_GUEST_ORDER = 'CREAT_GUEST_ORDER'

const GotOrder = order => {
  return {
    type: GET_ORDER,
    order
  }
}

const CreatedOrder = order => {
  return {
    type: CREAT_GUEST_ORDER,
    order
  }
}

export const getOrder = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${id}`)

      dispatch(GotOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createOrder = id => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/orders/${id}`)

      dispatch(CreatedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}
const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case CREAT_GUEST_ORDER:
      return action.order
    default:
      return state
  }
}

export default placeOrderReducer
