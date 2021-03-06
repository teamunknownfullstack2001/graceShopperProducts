import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleUser} from '../store'
import {withStyles} from '@material-ui/core/styles'
import {OrderItem} from '.'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
const styles = theme => ({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: 'gray',
      fontSize: 8
    }
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    color: 'black',
    borderRadius: 3,
    margin: '0',
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: 'gray',
      flexDirection: 'column'
    }
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column'
  },
  info: {
    marginTop: '2vh',
    color: 'black',
    borderRadius: 3,
    display: 'flex',
    heigh: '10vh',
    flexDirection: 'column'
  },
  id: {
    marginTop: '2vh'
  },
  status: {
    marginTop: '2vh'
  },
  total: {
    marginTop: '2vh'
  },
  date: {
    marginTop: '2vh'
  }
})

class DisconnectedOrderHistory extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }
  render() {
    const {classes} = this.props
    const orders = this.props.user.orders
    return (
      <div>
        {orders
          ? orders
              .filter(order => order.status === 'placed')
              .map(order => (
                <Card
                  className={classes.root}
                  variant="outlined"
                  key={order.id}
                >
                  <CardContent className={classes.info}>
                    <h3>Order Id: {order.id}</h3>

                    <h3>Status: {order.status}</h3>

                    <h3>Total Charged: ${(order.total / 100).toFixed(2)}</h3>

                    <h3>Date Ordered: {order.updatedAt.slice(0, 10)}</h3>
                  </CardContent>
                  <CardContent className={classes.content}>
                    {order.products.map(product => (
                      <OrderItem key={product.id} orderItem={product} />
                    ))}
                  </CardContent>
                </Card>
              ))
          : 'No orders'}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => ({
  getSingleUser: id => dispatch(getSingleUser(id))
})

const OrderHistory = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedOrderHistory)

export default withStyles(styles)(OrderHistory)
