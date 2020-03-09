import React from 'react'
import {connect} from 'react-redux'
import {addToOrIncrementCart, decrementCart, removeFromCart} from '../store'
import {withStyles} from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
import {Link} from 'react-router-dom'
//https://material-ui.com/components/material-icons/
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  // typography: {
  //   // In Chinese and Japanese the characters are usually larger,
  //   // so a smaller fontsize may be appropriate.
  //   [theme.breakpoints.down('sm')]: {
  //     // backgroundColor: 'gray',
  //     fontSize: 8
  //   }
  // },
  root: {
    marginTop: '1vh',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    color: 'black',
    borderRadius: 3,
    margin: '0',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: 'gray',
      flexDirection: 'column'
    }
  },
  // content: {
  //   display: 'flex',
  //   flexGrow: 1,
  //   flexDirection: 'row'
  // },
  name: {
    flex: '2 0 0'
  },
  des: {
    flex: '5 0 0'
  },
  quantity: {
    flex: '2 0 0'
  },
  price: {
    flex: '2 0 0'
  }
})

class OrderItem extends React.Component {
  componentDidMount() {}
  render() {
    const {classes} = this.props
    console.log(this.props)
    return (
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent className={classes.content}>
            <Typography className={classes.name} variant="h5" component="h2">
              {`Item:  ${this.props.orderItem.name}`}
            </Typography>
            <Typography className={classes.des} variant="h5" component="h2">
              {`Item Details:  ${this.props.orderItem.description}`}
            </Typography>
            <Typography
              className={classes.quantity}
              variant="h5"
              component="h2"
            >
              {`Qty: ${this.props.orderItem.orderproduct.quantity}`}
            </Typography>
            <Typography variant="h5" className={classes.price} component="h2">
              {`Price: $ ${(this.props.orderItem.price / 100).toFixed(2)}`}
            </Typography>
          </CardContent>
          <Button size="large">
            <Link to={`/products/${this.props.orderItem.id}`}>
              {' '}
              Item Details{' '}
            </Link>
          </Button>
          <CardMedia
            className={classes.media}
            image={this.props.orderItem.imageUrl}
            title="Paella dish"
          />
        </Card>
      </div>
    )
  }
}

const mapState = state => ({user: state.user})
const mapDispatch = dispatch => ({
  incrementCart: (userId, product) =>
    dispatch(addToOrIncrementCart(userId, product)),
  decrementCart: (userId, product) => dispatch(decrementCart(userId, product)),
  removeFromCart: (userId, product) => dispatch(removeFromCart(userId, product))
})

export default connect(mapState, mapDispatch)(withStyles(styles)(OrderItem))
