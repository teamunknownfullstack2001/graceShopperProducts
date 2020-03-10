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

//https://material-ui.com/components/material-icons/
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  media: {
    maxWidth: '200px',
    maxheight: '200px'
  },
  root: {
    marginTop: '10vh',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    color: 'black',
    borderRadius: 3,
    borderTop: '0px',
    margin: '0',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row'
  },
  name: {
    flex: '5 0 0'
  },
  quantity: {
    flex: '2 0 0'
  },
  price: {
    flex: '2 0 0'
  }
})

class CartItem extends React.Component {
  componentDidMount() {}
  render() {
    const {classes} = this.props
    return (
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent className={classes.content}>
            <Typography className={classes.name} variant="h5" component="h2">
              {`Name: ${this.props.cartItem.name}`}
            </Typography>
            <Typography
              className={classes.quantity}
              variant="h5"
              component="h2"
            >
              {`Qty: ${this.props.cartItem.orderproduct.quantity}`}
            </Typography>
            <Typography variant="h5" className={classes.price} component="h2">
              {`Price: $ ${(this.props.cartItem.price / 100).toFixed(2)}`}
            </Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={this.props.cartItem.imageUrl}
            title="Paella dish"
          />
          {this.props.button === true ? (
            <CardActions className={classes.buttonBar}>
              <Button
                size="large"
                disabled={
                  this.props.cartItem.stock -
                    this.props.cartItem.orderproduct.quantity ===
                  0
                }
                startIcon={<AddIcon />}
                onClick={() => {
                  this.props.incrementCart(
                    this.props.user.id,

                    this.props.cartItem
                  )
                }}
              >
                Add
              </Button>

              <Button
                size="large"
                startIcon={<RemoveIcon />}
                disabled={this.props.cartItem.orderproduct.quantity === 1}
                onClick={() => {
                  this.props.decrementCart(
                    this.props.user.id,

                    this.props.cartItem
                  )
                }}
              >
                Remove
              </Button>

              <Button
                size="large"
                color="secondary"
                startIcon={<DeleteOutlinedIcon />}
                onClick={() => {
                  this.props.removeFromCart(
                    this.props.user.id,
                    this.props.cartItem
                  )
                }}
              >
                Delete from cart
              </Button>
            </CardActions>
          ) : (
            ''
          )}
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

export default connect(mapState, mapDispatch)(withStyles(styles)(CartItem))
