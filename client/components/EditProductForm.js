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

        {/*<li>
            <label htmlFor="tags">Tags:</label>
            <select multiple={true} name="tags" value={props.tags}>
              <option value="Bathroom">Bathroom</option>
              <option value="Modern">Modern</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Natural">Natural</option>
              <option value="Oriental">Oriental</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Persian">Persian</option>
              <option value="Shag">Shag</option>
              <option value="Synthetic">Synthetic</option>
              <option value="Tribal">Tribal</option>
              <option value="Vintage">Vintage</option>
              <option value="Woven">Woven</option>
            </select>
  </li>*/}
        {/*<li>
            <fieldset>
            <label htmlFor="tags">Tags:</label>
              <input
                type="checkbox"
                name="tags"
                value="Bathroom"
                onSubmit={props.onSubmit}/>Bathroom<br/>
              <input
                type="checkbox"
                name="tags"
                value="Modern"
                onSubmit={props.onSubmit}/>Modern<br/>
              <input
                type="checkbox"
                name="tags"
                value="Moroccan"
                onSubmit={props.onSubmit}/>Moroccan<br/>
              <input
                type="checkbox"
                name="tags"
                value="Natural"
                onSubmit={props.onSubmit}/>Natural<br/>
              <input
                type="checkbox"
                name="tags"
                value="Oriental"
                onSubmit={props.onSubmit}/>Oriental<br/>
              <input
                type="checkbox"
                name="tags"
                value="Outdoor"
                onSubmit={props.onSubmit}/>Outdoor<br/>
              <input
                type="checkbox"
                name="tags"
                value="Persian"
                onSubmit={props.onSubmit}/>Persian<br/>
              <input
                type="checkbox"
                name="tags"
                value="Shag"
                onSubmit={props.onSubmit}/>Shag<br/>
              <input
                type="checkbox"
                name="tags"
                value="Synthetic"
                onSubmit={props.onSubmit}/>Synthetic<br/>
              <input
                type="checkbox"
                name="tags"
                value="Tribal"
                onSubmit={props.onSubmit}/>Tribal<br/>
              <input
                type="checkbox"
                name="tags"
                value="Vintage"
                onSubmit={props.onSubmit}/>Vintage<br/>
              <input
                type="checkbox"
                name="tags"
                value="Woven"
                onSubmit={props.onSubmit}/>Woven<br/>
            </fieldset>
          </li>*/}
        <br />
        <br />
        <Button
          size="large"
          color="secondary"
          startIcon={<EditIcon />}
          type="submit"
        >
          Edit Product
        </Button>
      </form>
    </div>
  )
}

export default EditProductForm
