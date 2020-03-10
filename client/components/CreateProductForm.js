import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
const styles = {}

const CreateProductForm = props => {
  return (
    <div className="col-md-8 order-md-1">
      <form onSubmit={props.onSubmit} className="needs-validation">
        <label className="mb-3" htmlFor="name">
          Name:
        </label>
        <input className="form-control" type="text" name="name" />

        <label className="mb-3" htmlFor="imageUrl">
          Image Url:
        </label>
        <input
          className="form-control"
          type="text"
          name="imageUrl"
          defaultValue="https://images.rugimg.com/3140387/3140387_image_1010.jpg?canvas=740%2C700&fit=bounds&bg-color=white&height=700&width=740&quality=85"
        />

        <label className="mb-3" htmlFor="category">
          Category:
        </label>
        <select name="category" value={props.category} className="form-control">
          <option value="Area">Area</option>
          <option value="Octagon">Octagon</option>
          <option value="Oval">Oval</option>
          <option value="Round">Round</option>
          <option value="Runner">Runner</option>
          <option value="Square">Square</option>
        </select>

        <label className="mb-3" htmlFor="description">
          Description:
        </label>
        <textarea className="form-control" name="description" />

        <label className="mb-3" htmlFor="price">
          Price:
        </label>
        <input
          className="form-control"
          type="text"
          step=".01"
          min="0"
          name="price"
          // value={`$ ${(props.price / 100).toFixed(2)}`}
        />

        <label className="mb-3" htmlFor="stock">
          Stock:
        </label>
        <input
          className="form-control"
          type="number"
          defaultValue="100"
          min="0"
          max="100"
          name="stock"
        />

        <br />
        <br />
        <Button
          size="large"
          style={{color: 'green'}}
          startIcon={<AddCircleOutlineIcon />}
          type="submit"
        >
          Add Product
        </Button>
      </form>
    </div>
  )
}

export default CreateProductForm
