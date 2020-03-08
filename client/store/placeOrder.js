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
      console.log('I am in thunk', id)
      const {data} = await axios.get(`/api/orders/${id}`)
      console.log('data', data)
      dispatch(GotOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createOrder = id => {
  return async dispatch => {
    try {
      console.log('in create guess order')
      const {data} = await axios.post(`/api/orders/${id}`)
      console.log('after created', data)
      dispatch(CreatedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}
const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      console.log('action,', action.order)
      return action.order
    case CREAT_GUEST_ORDER:
      return action.order
    default:
      return state
  }
}

export default placeOrderReducer
