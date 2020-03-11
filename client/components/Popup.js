import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'

export default class Popup extends Component {
  handleClick = () => {
    this.props.toggle()
  }

  render() {
    console.log('popup')
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <p>Friend Added To Cart</p>
          <Link to="/products" style={{textDecoration: 'none', color: 'black'}}>
            <Button>Back To Friends</Button>
          </Link>
        </div>
      </div>
    )
  }
}
