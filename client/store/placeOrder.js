import axios from 'axios'

const GET_ORDER = 'GET_ORDER'

const GotOrder = order => {
  return {
    type: GET_ORDER,
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

const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      console.log('action,', action.order)
      return action.order
    default:
      return state
  }
}

export default placeOrderReducer
