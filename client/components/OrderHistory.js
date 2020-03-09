import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleUser} from '../store'
import {withStyles} from '@material-ui/core/styles'
import OrderItem from './order-item'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
const styles = {
  media: {
    maxWidth: '200px',
    maxheight: '200px'
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    color: 'black',
    borderRadius: 3,
    margin: '0'
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row'
  },
  info: {
    display: 'flex',
    heigh: '10vh',
    flexDirection: 'column'
  },
  id: {
    flex: '3 0 0'
  },
  status: {
    flex: '3 0 0'
  },
  total: {
    flex: '3 0 0'
  },
  date: {
    flex: '3 0 0'
  }
  // itemsInfo: {
  //   flex: '4 0 0'
  // }
}

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
                    <Typography
                      className={classes.id}
                      variant="h5"
                      component="h2"
                    >
                      <h3> Order Id: {order.id}</h3>
                    </Typography>
                    <Typography
                      className={classes.status}
                      variant="h5"
                      component="h2"
                    >
                      <h3> Status: {order.status}</h3>
                    </Typography>
                    <Typography
                      className={classes.total}
                      variant="h5"
                      component="h2"
                    >
                      <h3>Total Charged: {order.total}</h3>
                    </Typography>
                    <Typography
                      className={classes.date}
                      variant="h5"
                      component="h2"
                    >
                      <h3>Date Ordered: {order.updatedAt}</h3>
                    </Typography>
                  </CardContent>
                  <CardContent className={classes.content}>
                    <h3>
                      {order.products.map(product => (
                        <OrderItem key={product.id} orderItem={product} />
                      ))}
                    </h3>
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
