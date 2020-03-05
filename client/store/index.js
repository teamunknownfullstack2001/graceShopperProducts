import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'

import userCart from './user-cart'
import productsReducer from './products'
import singleProductReducer from './singleProduct'
import placeOrderReducer from './placeOrder'
import orderReducer from './order'
// import payment from './payment'

const reducer = combineReducers({
  user: user,
  products: productsReducer,
  product: singleProductReducer,
  userCart: userCart,
  order: placeOrderReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

export * from './user-cart'

export * from './products'
export * from './singleProduct'
export * from './placeOrder'
export * from './order'

// export * from './payment'
