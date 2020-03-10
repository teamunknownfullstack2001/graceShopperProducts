export const DESTROY_USER = 'DESTROY_USER'
export const MODIFY_USER = 'MODIFY_USER'

export const destroyUser = userId => ({
  type: DESTROY_USER,
  userId: userId
})

export const modifyUser = user => ({
  type: MODIFY_USER,
  user: user
})

//  thunks

export const deleteUser = userId => {
  return async dispatch => {
    try {
      console.log('deleteUser')
      await axios.delete(`/api/users/${userId}`)
      dispatch(destroyUser(userId))
    } catch (error) {
      console.error(`${userId} DELETE Error`)
    }
  }
}

export const putUser = (id, userUpdates, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${id}`, userUpdates)
      dispatch(modifyUser(data))
      history.push(`/userprofile/${id}`)
    } catch (error) {
      console.error(`PUT fail users/${id}`)
    }
  }
}

const initialState = []
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case DESTROY_USER:
      return state.filter(user => user.id !== action.userId)
    case MODIFY_USER: {
      const otherUsers = state.map(user => {
        if (user.id === action.user.id) {
          return action.user
        }
        return user
      })
      return otherUsers
    }
    default:
      return state
  }
}
export default usersReducer
