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

const EditUserForm = props => {
  const {initialValues, handleSubmit} = props

  return (
    <div className="col-md-8 order-md-1">
      <form onSubmit={handleSubmit} className="needs-validation">
        <label className="mb-3" htmlFor="userName">
          Name:
        </label>
        <input
          className="form-control"
          type="text"
          name="userName"
          defaultValue={initialValsFromProps('userName', initialValues)}
        />
        <label className="mb-3" htmlFor="email">
          Email:
        </label>
        <input
          className="form-control"
          type="text"
          name="email"
          defaultValue={initialValsFromProps('email', initialValues)}
        />
        <label className="mb-3" htmlFor="address">
          Address:
        </label>
        <input
          className="form-control"
          type="text"
          name="address"
          defaultValue={initialValsFromProps('address', initialValues)}
        />
        <label className="mb-3" htmlFor="zip">
          Zip:
        </label>
        <input
          className="form-control"
          type="text"
          name="zip"
          defaultValue={initialValsFromProps('zip', initialValues)}
        />
        <label className="mb-3" htmlFor="phone">
          Phone:
        </label>
        <input
          className="form-control"
          type="text"
          name="phone"
          defaultValue={initialValsFromProps('phone', initialValues)}
        />
        <Button
          size="large"
          color="secondary"
          startIcon={<EditIcon />}
          type="submit"
        >
          Save Change
        </Button>
      </form>
    </div>
  )
}

export default EditUserForm
