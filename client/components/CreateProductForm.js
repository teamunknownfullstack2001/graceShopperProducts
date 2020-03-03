import React from 'react'

const CreateProductForm = props => {
  return (
    <div>
      <ul>
        <form onSubmit={props.onSubmit}>
          <li>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={props.name}
              onSubmit={props.onSubmit}
            />
          </li>
          <li>
            <label htmlFor="imageUrl">Image Url:</label>
            <input
              type="text"
              name="imageUrl"
              defaultValue="https://images.rugimg.com/3140387/3140387_image_1010.jpg?canvas=740%2C700&fit=bounds&bg-color=white&height=700&width=740&quality=85"
              onSubmit={props.onSubmit}
            />
          </li>
          <li>
            <label htmlFor="category">Category:</label>
            <select name="category" value={props.category}>
              <option value="Area">Area</option>
              <option value="Modern">Modern</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Natural">Natural</option>
              <option value="Oriental">Oriental</option>
              <option value="Persian">Persian</option>
            </select>
          </li>
          <li>
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              value={props.description}
              onSubmit={props.onSubmit}
            />
          </li>
          <li>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              step=".01"
              min="0"
              name="price"
              value={props.price}
              onSubmit={props.onSubmit}
            />
          </li>
          <li>
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              defaultValue="100"
              min="0"
              max="100"
              name="stock"
              value={props.stock}
              onSubmit={props.onSubmit}
            />
          </li>
          <li>
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
          </li>
          <li>
            <button type="submit">Submit</button>
          </li>
        </form>
      </ul>
    </div>
  )
}

export default CreateProductForm
