import React from 'react'

const CreateProductForm = props => {
  return (
    <div>
      <ul>
        <form onSubmit={props.onSubmit}>
          <li>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" />
          </li>
          <li>
            <label htmlFor="imageUrl">Image Url:</label>
            <input
              type="text"
              name="imageUrl"
              defaultValue="https://images.rugimg.com/3140387/3140387_image_1010.jpg?canvas=740%2C700&fit=bounds&bg-color=white&height=700&width=740&quality=85"
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
            <textarea name="description" />
          </li>
          <li>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              step=".01"
              min="0"
              name="price"
              // value={`$ ${(props.price / 100).toFixed(2)}`}
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
            />
          </li>
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
          <li>
            <button type="submit">Submit</button>
          </li>
        </form>
      </ul>
    </div>
  )
}

export default CreateProductForm
