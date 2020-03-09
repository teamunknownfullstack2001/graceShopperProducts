import React from 'react'

const Error = () => {
  console.error('Route Error')
  return (
    <div className="container">
      <h1>
        <i>ERROR: PAGE NOT FOUND</i>
      </h1>
      <h2>
        <i>please double-check your route</i>
      </h2>
    </div>
  )
}
export default Error
