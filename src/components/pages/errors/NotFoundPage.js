import React from 'react';
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className='error-container'>
      <h1 className='error-title'>
        PAGE NOT FOUND
      </h1>
      <h2 className='error-description'>
        Something went wrong, return home
      </h2>
    </div>
  )
}

export default NotFoundPage