import React from 'react'
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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
const styles = {}

const Tag = props => {
  const {tag} = props

  return (
    <div>
      <Link
        to={`/tags/${tag.id}`}
        style={{textDecoration: 'none', color: 'black'}}
      >
        <div key={tag.id}>
          <Button size="large">{tag.name}</Button>
        </div>
      </Link>
    </div>
  )
}

export default Tag
