import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
//https://material-ui.com/components/material-icons/
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
const styles = {
  media: {
    // height: 0,
    maxWidth: '200px',
    maxheight: '200px',
    paddingTop: '56.25%' // 16:9
  },
  root: {
    marginTop: '10vh',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    color: 'black',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px',
    height: '100px',
    margin: '10px'
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
}

class CartItem extends React.Component {
  componentDidMount() {}
  render() {
    const {classes} = this.props
    const showEng = this.props.user.language === 'EN'
    return (
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent className={classes.content}>
            <Typography
              className={classes.name}
              variant="h5"
              component="h2"
              // align="center"
            >
              {`Name: ${this.props.cartItem.name}`}
            </Typography>
            <Typography
              className={classes.quantity}
              variant="h5"
              component="h2"
              // align="center"
            >
              {`Qty: ${this.props.cartItem.quantity}`}
            </Typography>
            <Typography
              variant="h5"
              className={classes.price}
              component="h2"
              // align="center"
            >
              {`Price: ${this.props.cartItem.price}`}
            </Typography>
            {/* <Typography variant="h5" component="h2" align="center">
              {`Image: ${this.props.cartItem.imageUrl}`}
            </Typography> */}
            {/* <Typography paragraph variant="h5" component="h2" align="center">
              {`Description: ${this.props.cartItem.description}`}
            </Typography> */}
          </CardContent>
          <CardMedia
            className={classes.media}
            image={this.props.cartItem.imageUrl}
            title="Paella dish"
          />
          <CardActions className={classes.buttonBar}>
            <Button
              size="large"
              startIcon={<RemoveIcon />}
              // id={1}
              // href={`/triviahimhers?id=${this.props.question.id}&type=vote`}

            >
              Add
            </Button>

            <Button
              size="large"
              startIcon={<AddIcon />}
              // id={1}
              // href={`/triviahimhers?id=${this.props.question.id}&type=vote`}

            >
              Remove
            </Button>

            <Button
              size="large"
              startIcon={<DeleteOutlinedIcon />}
              // id={1}
              // href={`/triviahimhers?id=${this.props.question.id}&type=vote`}
            >
              Delete from cart
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapState = state => ({user: state.user})
const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(withStyles(styles)(CartItem))
