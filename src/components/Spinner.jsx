import React from 'react'
import spinnerImage from "../../public/images/spinner.gif"

const Spinner = () => {
  return (
    <div className="container">
      <div className="row">
        <div className='d-flex justify-content-between align-items-center'>
          <img src={spinnerImage} style={{ width: "300px", margin: "0 auto"}} />
        </div>
      </div>
    </div>

  )
}

export default Spinner
