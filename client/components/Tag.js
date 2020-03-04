import React from 'react'
import {Link} from 'react-router-dom'

const Tag = props => {
  const {tag} = props

  return (
    <div>
      <Link to="/products" style={{textDecoration: 'none', color: 'black'}}>
        <div key={tag.id}>
          <p>
            <i>{tag.name}</i>
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Tag
