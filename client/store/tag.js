import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_TAG = 'SET_TAG'
/**
 * ACTION CREATORS
 */
const setTag = tag => ({type: SET_TAG, tag})

/**
 * THUNK CREATORS
 */

export const fetchTag = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/tags/${id}`)

      dispatch(setTag(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */

const tagReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TAG:
      return action.tag
    default:
      return state
  }
}

export default tagReducer
