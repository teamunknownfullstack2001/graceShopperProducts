import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
// import purple from '@material-ui/core/colors/purple'
// import green from '@material-ui/core/colors/green'

const theme = createMuiTheme({
  // palette: {
  //   primary: purple,
  //   secondary: green
  // },
  // status: {
  //   danger: 'orange'
  // }
})
// establishes socket connection
import './socket'

const stripePromise = loadStripe('pk_test_pPRna1khntUpsR5cAJIdpJQ500hjN9lKlz')

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Elements stripe={stripePromise}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Elements>
    </Router>
  </Provider>,
  document.getElementById('app')
)
