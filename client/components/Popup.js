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
      <div className="modal_content">
        <p>
          <i>Success!</i>
        </p>
        <div>
          <p>
            You've added a new friend to your cart... Nice! Meeting people is
            hard - Why bother making friends the old fashioned way when you can
            just buy one from us?
          </p>
          <Link to="/products" style={{textDecoration: 'none', color: 'black'}}>
            <Button>Browse Friends</Button>
          </Link>
          <Button onClick={this.handleClick}>Close</Button>
        </div>
      </div>
    )
  }
}
