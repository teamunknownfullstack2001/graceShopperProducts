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
import EditIcon from '@material-ui/icons/Edit'
const styles = {}

const initialValsFromProps = (field, initialValues) => {
  return initialValues ? initialValues[field] : ''
}

const EditProductForm = props => {
  const {initialValues, handleSubmit} = props

  return (
    <div className="standardContainer">
      <div className="col-md-8 order-md-1">
        <form onSubmit={handleSubmit} className="needs-validation">
          <label className="mb-3" htmlFor="name">
            Name:
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            defaultValue={initialValsFromProps('name', initialValues)}
          />

          <label className="mb-3" htmlFor="imageUrl">
            Image Url:
          </label>
          <input
            className="form-control"
            type="text"
            name="imageUrl"
            defaultValue={initialValsFromProps('imageUrl', initialValues)}
          />

          <label className="mb-3" htmlFor="category">
            Category:
          </label>
          <select
            className="form-control"
            name="category"
            defaultValue={initialValsFromProps('category', initialValues)}
          >
            <option value="Conditional">Conditional</option>
            <option value="Fair-Weather">Fair-Weather</option>
            <option value="Long-Term">Long-Term</option>
            <option value="Noncommital">Noncommital</option>
            <option value="Short-Term">Short-Term</option>
            <option value="Unconditional">Unconditional</option>
          </select>

          <label className="mb-3" htmlFor="description">
            Description:
          </label>
          <textarea
            className="form-control"
            name="description"
            defaultValue={initialValsFromProps('description', initialValues)}
          />

          <label className="mb-3" htmlFor="price">
            Price:
          </label>
          <input
            className="form-control"
            type="text"
            step=".01"
            min="0"
            name="price"
            defaultValue={(
              initialValsFromProps('price', initialValues) / 100
            ).toFixed(2)}
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
            defaultValue={initialValsFromProps('stock', initialValues)}
          />
          <br />
          <br />
          <Button
            size="large"
            color="secondary"
            startIcon={<EditIcon />}
            type="submit"
          >
            Edit Friend
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProductForm
